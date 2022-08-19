import { exec } from "../../util/shell";
import { Werft } from "../../util/werft";
import { JobConfig } from "./job-config";

interface config {
    phase: string;
    description: string;
}

const phases: { [name: string]: config } = {
    gke: {
        phase: "trigger upgrade test in GKE",
        description: "Triggers upgrade test on supplied version from Beta channel on GKE cluster",
    },
    aks: {
        phase: "trigger upgrade test in AKS",
        description: "Triggers upgrade test on supplied version from Beta channel on AKS cluster",
    },
    k3s: {
        phase: "trigger upgrade test in K3S",
        description: "Triggers upgrade test on supplied version from Beta channel on K3S cluster",
    },
    eks: {
        phase: "trigger upgrade test in EKS",
        description: "Triggers upgrade test on supplied version from Beta channel on EKS cluster",
    },
};

/**
 * Trigger self hosted upgrade tests
 */
export async function triggerUpgradeTests(werft: Werft, config: JobConfig, username: string) {
    if (!config.withUpgradeTests || !config.fromVersion) {
        werft.log("Triger upgrade tests", "Skipped upgrade tests");
        werft.done("trigger upgrade tests");
        return;
    }

    const channel: string = config.replicatedChannel || "beta";

    exec(`git config --global user.name "${username}"`);
    var annotation = `-a version=${config.fromVersion} -a upgrade=true -a channel=${channel} -a preview=true -a skipTests=true`;

    for (let phase in phases) {
        const upgradeConfig = phases[phase];

        werft.phase(upgradeConfig.phase, upgradeConfig.description);

        annotation = `${annotation} -a cluster=${phase} -a updateGitHubStatus=gitpod-io/gitpod`

        const testFile: string = ".werft/self-hosted-installer-tests.yaml";

        try {
            exec(
                `werft run --remote-job-path ${testFile} ${annotation} github`,
                {
                    slice: upgradeConfig.phase,
                },
            ).trim();

            werft.done(upgradeConfig.phase);
        } catch (err) {
            if (!config.mainBuild) {
                werft.fail(upgradeConfig.phase, err);
            }
            exec("exit 0");
        }
    }
}

export async function triggerSelfHostedPreview(werft: Werft, config: JobConfig, username: string) {
    const replicatedChannel =  config.replicatedChannel || config.repository.branch;
    const cluster =  config.cluster || "k3s";

    var licenseFlag: string = ""

    if(!["stable", "unstable", "beta"].includes(replicatedChannel.toLowerCase())){
        werft.phase("get-replicated-license", `Create and download replicated license for ${replicatedChannel}`);

        exec(`replicated customer create --channel ${replicatedChannel} --name ${replicatedChannel}`,
            { slice: "get-replicated-license"})

        exec(`replicated customer download-license --customer ${replicatedChannel} > license.yaml`,
            { slice: "get-replicated-license", dontCheckRc: true})

        exec(`install -D license.yaml install/licenses/${replicatedChannel}.yaml`,
            { slice: "get-replicated-license"},
        )
        werft.done("get-replicated-license");

        licenseFlag = `-s install/licenses/${replicatedChannel}.yaml`
    }


    exec(`git config --global user.name "${username}"`);

    var annotation = `-a channel=${replicatedChannel} -a preview=true -a skipTests=true -a deps=external`;

    werft.phase("self-hosted-preview", `Create self-hosted preview in ${cluster}`);

    annotation = `${annotation} -a cluster=${cluster} -a updateGitHubStatus=gitpod-io/gitpod`

    const testFile: string = ".werft/self-hosted-installer-tests.yaml";

    try {
        exec(
            `werft run --remote-job-path ${testFile} ${annotation} github ${licenseFlag}`,
            {
                slice: "self-hosted-preview"
            },
        ).trim();

        werft.done("self-hosted-preview");
    } catch (err) {
        if (!config.mainBuild) {
            werft.fail("self-hosted-preview", err);
        }
        exec("exit 0");
    }
}
