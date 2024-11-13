<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();



</script>

<template>
  <ul id="nav"> 
    <a @click="router.push('/')">Home</a> 
    
    <a @click="router.push('/adicionar')">Adicionar Produtos</a>
  </ul>
  <RouterView />
</template>

<style scoped>
  #nav{
    display: flex;
    justify-content: center;
    transform: translateY(-200%);
    gap: 50px;
    padding: 0;
    margin: 0;

  }
  #nav > a {
    text-decoration: none;
    color: aqua;
    cursor: pointer;
    font-size: 2rem;
    transition: 0.3s;
  }

  #nav > a:hover {
    scale: 1.1;
  }
</style>
