import { ethers } from "ethers";

export default class BaseInterface {
  _provider;
  _contractAddress;
  _abis;
  _contract;
  _option;

  constructor(
    provider,
    address,
    abi
  ) {
    this._provider = provider;
    this._contractAddress = address;
    this._abis = abi;
    this._option = { gasLimit: 1000000 };
    this._contract = new ethers.Contract(address, abi, provider.getSigner());
  }

  _handleTransactionResponse = async (tx) => {
    try {
      const recept = await tx.wait();
      return recept.transactionHash;
    } catch (error) {
      throw new Error(error?.reason || error.message || error);
    }
  };

  _numberToEth = (amount) => {
    return ethers.utils.parseEther(amount.toString());
  };

  _toNumber = (bigNumber) => {
    try {
      return bigNumber.toNumber();
    } catch (error) {
      return Number.parseFloat(ethers.utils.formatEther(bigNumber));
    }
  };

  _toEther = (bigNumber) => {
    return Number.parseFloat(ethers.utils.formatEther(bigNumber));
  };

  _toWei = (amount) => {
    return ethers.utils.parseUnits(amount.toString());
  };
}
