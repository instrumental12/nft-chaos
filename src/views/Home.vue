<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button></button>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import Web3 from 'web3';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup(props) {
    return {
      
    }
  }
});
</script>
