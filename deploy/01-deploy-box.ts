import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { blockConfirmations, developmentChains } from '../helper-hardhat-config';
import verify from "../utils/verify"

const deployBox:DeployFunction = async function (hre:HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts, network} = hre;

  const {deploy, log} = deployments;
  const {deployer} = await getNamedAccounts();

  const waitConfirmations = developmentChains.includes(network.name) ? 1 : blockConfirmations

  log("************************** 배포중 **************************")
  const box = await deploy("Box",{
    from: deployer,
    log: true,
    args: [],
    waitConfirmations: waitConfirmations,
    proxy: {
      proxyContract:"OpenZeppelinTransparentProxy",
      viaAdminContract: {
        name: "BoxProxyAdmin",
        artifact: "BoxProxyAdmin"
      }
    }
  })

  if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    await verify(box.address, [])
  }
  log("-----------------------------------------")
};

export default deployBox;
deployBox.tags = ["all","box"];