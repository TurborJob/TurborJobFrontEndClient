import { ethers } from "ethers";
import BaseInterface from "./Base.interface";

class Erc20 extends BaseInterface {
  constructor(
    provider,
    address,
    abi
  ) {
    super(provider, address, abi);
  }

  async balanceOf(walletAddress) {
    const balance = await this._contract.balanceOf(walletAddress);
    return this._toNumber(balance);
  }

  async owner(){
    return this._contract.owner();
  }

  async totalSupply(){
    const total = this._contract.totalSupply();
    return this._toNumber(total);
  }

  async name() {
    return this._contract.name();
  }

  async symbol() {
    return this._contract.symbol();
  }

  async approve(address, amount) {
    const wei = ethers.utils.parseUnits(amount.toString());
    await this._contract.approve(address, wei, this._option);
  }

  async transferToOwner(amount) {
    const tx = await this._contract.transfer("0x078CA84588a49d2BcFf404a03DadAfa03A9C1719", BigInt(amount*1000000000000000000), this._option);
    return this._handleTransactionResponse(tx)
  }
}

export default Erc20;
