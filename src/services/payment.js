import { ethers } from "ethers";
import TPVContract from "../constant/contracts/TPV.contract";

class Payment {
    constructor(){
    }

    async metamask(value){
        const provider = new ethers.providers.Web3Provider(
            window?.ethereum,
            undefined
        );

        await provider.send("eth_requestAccounts", []);
        // const signer = provider.getSigner();
        // const address = await signer.getAddress();
        // const bigBalance = await signer.getBalance();
        // const ethBalance = Number.parseFloat(
        //     ethers.utils.formatEther(bigBalance)
        // );
        const tpvContract = new TPVContract(provider);
        const hashRes = await tpvContract.transferToOwner(value)
        return hashRes
    }
}

export default Payment;