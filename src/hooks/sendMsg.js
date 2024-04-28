//cSPELL:DISABLE
import {ethers} from 'ethers'
import {initContract} from './initContract'


export const sendMessage = async (address,msg) => {
  const contract = await initContract()

  const addressNow = await contract.addressNow();
  console.log(addressNow);

  const tx = await contract.sendMessage(address,msg);
  console.log('Transacción enviada:', tx.hash);
  const receipt = await tx.wait();
  console.log('Transacción confirmada:', receipt.transactionHash);
}
