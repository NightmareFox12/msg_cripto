import { ethers } from 'ethers';

export const updateAddressContext = async () => {
  try {
    if (typeof window.ethereum === 'undefined') {
      console.error('MetaMask is not installed!');
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return Promise.resolve(signer.address);

  } catch (err) {
    console.error(err);
  }
};