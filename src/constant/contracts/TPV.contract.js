import { ethers } from "ethers"
import Erc20  from "./interface/Erc20.interface"
import abiTPV from './abis/tpv.json'

export default class TPVContract extends Erc20 {
    constructor(provider){
        super(provider,"0x8905cE4f0a88d1c0aadc7eE5cA37C79FCa0EBc48",abiTPV)
    }
}