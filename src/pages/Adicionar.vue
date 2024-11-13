<template>

    <form id="adicionar">

        <div id="Input">
            <label for="username">Nome </label>
            <InputText id="name" v-model="produto.nome" aria-describedby="username-help" />
        </div>
        <div id="Input">
            <label for="username">Preço</label>
            <InputText id="price" v-model="produto.preco" type="number" />
        </div>
        <Button @click="createProduct()" style="width: 45%; margin: 0 auto;"><span class="pi pi-cart-plus"></span>Adicionar Produto</Button>
    </form>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const produto = ref({ nome: '', preco: '' });

async function createProduct() {
    try {
        if(!produto.value.nome || !produto.value.preco){
            toast.error("Preencha todos os campos para criar o produto!", { position: "bottom-left" });
            return;
        }

        await axios.post("http://localhost:3000", {
            nome: produto.value.nome,
            preco: produto.value.preco
        });
        toast.success("Produto criado com sucesso!", { position: "bottom-left" });
        return;
        
    } catch (error) {
        toast.error("Erro ao efetuar conexão com api!", { position: "bottom-left" });
    }
}


</script>

<style>
#adicionar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 25%;
    height: 35vh;
    padding: 25px;
    background-color: #18181B;
    border: 2px solid #27272A;
    border-radius: 15px;
}

#Input {
    width: 70%;
    display: flex;
    align-items: center;
    gap: 5px;
    flex-direction: column;
}

#price {
    width: 100%;
}

#name {
    width: 100%;
}
</style>