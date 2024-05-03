import { ethers } from 'ethers';

export const initContract = async (signner,ABIfile) => {
  try {

    const contractAddress = '0x9DA39d69B1BDC9d0c0d3ec48a74dcfA9c4c0fafe';
    const provider = new ethers.JsonRpcProvider(process.env.URL_PROVIDER);
    const AbiJson = JSON.parse(ABIfile)
    const contract = new ethers.Contract(contractAddress,AbiJson.abi,provider);
    
    const newContract = contract.connect(signner);
    return Promise.resolve(newContract);
  
  } catch (err) {
    return Promise.reject('error al conectar con el contract', err);
  }
};