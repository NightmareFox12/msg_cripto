'use client';

export const WalletConnector = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  useEffect(() => {
    
    (async () => {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsWalletConnected(true);
      } catch (error) {
        alert('Por favor, conecta tu wallet para continuar.');
        setIsWalletConnected(false);
      }
    })();

  }, []);
}