import { ethers } from 'ethers';

export const initContract = async (signner,ABIfile) => {
  try {

    // const contractAddress = '0x9DA39d69B1BDC9d0c0d3ec48a74dcfA9c4c0fafe';
    // const provider = new ethers.JsonRpcProvider(process.env.URL_PROVIDER);

    const contractAddress = '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0' //local
    const provider = new ethers.JsonRpcProvider('//localhost:8545') //local

    const AbiJson = JSON.parse(ABIfile)
    const contract = new ethers.Contract(contractAddress,AbiJson.abi,provider);
    
    const newContract = contract.connect(signner);
    return Promise.resolve(newContract);
  
  } catch (err) {
    console.log(err)
    return Promise.reject('error al conectar con el contract', err);
  }
};