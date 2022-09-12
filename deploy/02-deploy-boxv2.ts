import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { blockConfirmations, developmentChains } from "../helper-hardhat-config";
import verify from "../utils/verify";

const boxV2Deploy:DeployFunction = async function(hre:HardhatRuntimeEnvironment) {
    const { deployments, getNamedAccounts, network } = hre;

    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const waitConfirmations = developmentChains.includes(network.name) ? 1 : blockConfirmations;

    const boxV2 = await deploy("BoxV2", {
        from: deployer,
        log: true,
        args: [],
        waitConfirmations: waitConfirmations, 
    })

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(boxV2.address, []);
    }
}

export default boxV2Deploy;
boxV2Deploy.tags = ["all","boxv2"]