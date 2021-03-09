<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <button @click="connectToMetamask">Metamask</button>
    <button @click="connectToWalletConnect">WalletConnect</button>
  </div>
  <router-view/>
</template>
<script lang="ts">

import { defineComponent, ref, onMounted } from 'vue';
// import Web3 from 'web3';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { web3 } from '@/composables/useWeb3';
// import { ethers } from 'ethers'
declare global {
  interface Window {
      ethereum: any;
      web3: any;
  }
}
export default defineComponent({
  name: 'App',
  components: {
  },
  setup(props) {
    const { getWeb3Metamask, getWalletConnect, wcProvider, ethereum, web3Provider } = web3;
    const accounts = ref();
    const onEthMainnet = ref();
    const connectToMetamask = async () => {
      
      await ethereum.value.send('eth_requestAccounts').then((res: any )=>{
        console.log(res); 
      accounts.value = res.result[0]})
      console.log(accounts.value)
      console.log(await web3Provider.value?.eth.getBalance(accounts.value))
      localStorage.setItem('web3_connected_metamask', accounts.value)
      //make sure on mainnet
      onEthMainnet.value = (web3Provider?.value.currentProvider as any).chainId == "0x1"
      //

    }
    const initialize = ( ) => {
      getWeb3Metamask();
      getWalletConnect();
      if (localStorage.getItem('web3_connected_metamask')) {
        connectToMetamask();
      }
    }
    

    // const connectToWalletConnect = async () => {
    //   await wcProvider.value.enable();
    // }
  
    onMounted(initialize);
    
    //     // Subscribe to accounts change
    // provider.on("accountsChanged", (accounts: string[]) => {
    //   console.log(accounts);
    // });

    // // Subscribe to chainId change
    // provider.on("chainChanged", (chainId: number) => {
    //   console.log(chainId);
    // });

    // // Subscribe to session disconnection
    // provider.on("disconnect", (code: number, reason: string) => {
    //   console.log(code, reason);
    // });
    
    return {
      connectToMetamask,
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
