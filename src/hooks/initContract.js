import { ethers } from 'ethers';
import ContractABI from '@/hardhat/artifacts/contracts/MessagingApp.sol/MessagingApp.json';

export const initContract = async (signner) => {
  try {
    const contractAddress = '0x9DA39d69B1BDC9d0c0d3ec48a74dcfA9c4c0fafe';
    const provider = new ethers.JsonRpcProvider(process.env.URL_PROVIDER);
    const contract = new ethers.Contract(contractAddress,ContractABI.abi,provider);
    
    const newContract = contract.connect(signner);
    return Promise.resolve(newContract);
  
  } catch (err) {
    return Promise.reject('error al conectar con el contract', err);
  }
};