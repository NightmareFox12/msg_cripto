//cSPELL:DISABLE
import { ethers } from 'ethers';
import ContractABI from '@/hardhat/artifacts/contracts/MessagingApp.sol/MessagingApp.json';

export const initContract = async () => {
  try {
    const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
    const provider = new ethers.JsonRpcProvider();
    const contract = new ethers.Contract(contractAddress,ContractABI.abi,provider);
    return Promise.resolve(contract);
  
  } catch (err) {
    return Promise.reject('error al conectar con el contract', err);
  }
};