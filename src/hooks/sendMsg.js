//cSPELL:DISABLE
import {ethers} from 'ethers'
import {initContract} from './initContract'

export const sendMessage = async (newSignner,address,msg) => {
  try {
    const contract = await initContract(newSignner)
    const data = await contract['sendMessage(address,string)'](address,msg)
    const txReceipt = await data.wait();

    if (txReceipt.status === 1) return Promise.resolve();

  } catch (err) {
    return Promise.reject(new Error(err.reason))
  }
}

