//cSPELL:DISABLE
import { ethers } from 'ethers';
import ContractABI from '@/hardhat/artifacts/contracts/MessagingApp.sol/MessagingApp.json';

export const initContract = async (signner) => {
  try {
    const contractAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
    const provider = new ethers.JsonRpcProvider();
    const contract = new ethers.Contract(contractAddress,ContractABI.abi,provider);
    
    const newContract = contract.connect(signner);
    return Promise.resolve(newContract);
  
  } catch (err) {
    return Promise.reject('error al conectar con el contract', err);
  }
};