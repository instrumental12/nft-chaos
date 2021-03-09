import { ref } from "vue";
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
const FORTMATIC_API_KEY_PROD = 'pk_live_FAB74C0D879E804A'
declare global {
  interface Window {
      ethereum: Record<Record<string, any>, unknown>;
      web3: Record<unknown>;
      localStorage: Record<unknown>;
  }
}

// export interface Ethereum {
//   send: any;
// }
function useWeb3() {
  const isLoading = ref(false);
  const ethereum = ref();
  const web3Provider = ref();
  const wcProvider = ref();

  async function getWeb3Metamask() {

    if (typeof window.ethereum !== 'undefined') {
      ethereum.value = window.ethereum;
      web3Provider.value = new Web3(ethereum.value)
    } else if (typeof window.web3 !== 'undefined') {
      //Legacy dapp browsers...
      const web3 = window.web3;
      window.web3 = new Web3(web3.currentProvider);
    } else {
      // Non-dapp browsers...
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      );
    }

  }
  async function getWalletConnect() {
    const provider = new WalletConnectProvider({
      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
    });
    wcProvider.value = provider;
  }

  // async function getFortmatic() {
  //   let fm = new Fortmatic(FORTMATIC_API_KEY_PROD);
  //   window.web3 = new Web3(fm.getProvider())
  // }

  return {
    getWeb3Metamask,
    getWalletConnect,
    ethereum,
    web3Provider,
    wcProvider
  };
}

export const web3 = useWeb3();
