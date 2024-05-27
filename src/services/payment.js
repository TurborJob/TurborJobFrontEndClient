import { ethers } from "ethers";
import TPVContract from "../constant/contracts/TPV.contract";
import api from "./api";

class Payment {
  constructor() {}

  async metamask(value) {
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
    const hashRes = await tpvContract.transferToOwner(value);
    return hashRes;
  }

  async vnpay(value) {
    const res = await api.vnPay({ value: value });
    if (res) {
      window.open(
        res?.metadata,
        "_blank"
      );
    }
  }
}

export default Payment;
