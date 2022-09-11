// manual way

import { ethers } from "hardhat";

async function main() {
    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin");
    const transparentProxy = await ethers.getContract("Box_Proxy");
    const boxV2 = await ethers.getContract("BoxV2");
    const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2.address);
    await upgradeTx.wait(1);

    const proxyBox = await ethers.getContractAt("BoxV2", transparentProxy.address)

}

main()
  .then(() => {
    process.exitCode = 0;
  })
  .catch((error) => {
    console.log(error);
    process.exitCode = 1;
  });
