//cSPELL:DISABLE
import {ethers} from 'ethers'
import {initContract} from './initContract'


export const sendMessage = async (myAddress,address,msg) => {
  // console.log(myAddress)
  const contract = await initContract()
  const newContract = contract.connect() //aqui me quede

  const addressNow = await contract.addressNow();
  console.log(addressNow);

  const tx = await contract.sendMessage.staticCall(address,msg);
  console.log('Transacción enviada:', tx);
  // const receipt = await t

  // console.log('Transacción confirmada:', receipt.transactionHash);
}
