import { run } from "hardhat";

async function verify(contractAddress: string, args: any[]) {
  console.log("계약 검증을 시도합니다");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorAddress: args,
    });
  } catch (error:any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("이미 검증된 계약입니다.");
      return;
    }
    console.log(error);
  }
}

export default verify;
