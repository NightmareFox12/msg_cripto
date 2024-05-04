import {initContract} from './initContract'

export const sendMessage = async (newSignner,address,msg,ABIfile) => {
  try {
    const contract = await initContract(newSignner,ABIfile)
    const data = await contract['sendMessage(address,string)'](address,msg)
    const txReceipt = await data.wait();

    if (txReceipt.status === 1) return Promise.resolve();

  } catch (err) {
    return Promise.reject(new Error(err.reason))
  }
}

