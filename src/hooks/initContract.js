//cSPELL:DISABLE
import { ethers } from 'ethers';
import ContractABI from '@/hardhat/artifacts/contracts/MessagingApp.sol/MessagingApp.json';

export const initContract = async (signner) => {
  try {
    const contractAddress = '0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1';
    const provider = new ethers.JsonRpcProvider();
    const contract = new ethers.Contract(contractAddress,ContractABI.abi,provider);
    
    const newContract = contract.connect(signner);
    return Promise.resolve(newContract);
  
  } catch (err) {
    return Promise.reject('error al conectar con el contract', err);
  }
};