<template>
  <div style="overflow-y: hidden;" class="card">
    <DataTable style="overflow-y: scroll; height: 50vh;" v-if="products.length > 0" :value="products" tableStyle="min-width: 50rem">
      <div>
        <Column field="id" header="Codigo"></Column>
        <Column field="nome" header="Nome"></Column>
        <Column field="preco" header="Preço"></Column>
      </div>
      <Column>
        <template #body="slotProps">
          <div class="action-buttons">
            <div class="card flex justify-center">
              <Button label="Atualizar" class="p-button-warning" icon="pi pi-pencil"
                @click="openModal(slotProps.data)" />
              <Dialog v-model:visible="visible" modal header="Editar produto" style="width: 25rem; ">
                <div style="display: flex; flex-direction: column; margin-bottom: 15px;">
                  <label for="name" class="font-semibold w-24">Nome</label>
                  <InputText id="name" v-model="editUser.nome" class="flex-auto" autocomplete="off" />
                </div>
                <div style="display: flex; flex-direction: column; margin-bottom: 15px;">
                  <label for="price" class="font-semibold w-24">Preço</label>
                  <InputNumber id="price" v-model="editUser.preco" inputId="integeronly" fluid type="number" class="flex-auto" autocomplete="off" />
                </div>
                <div style="display: flex; gap: 15px;">
                  <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
                  <Button type="button" label="Salvar" @click="handleEdit"></Button>
                </div>
              </Dialog>
            </div>
            <Button label="Deletar" icon="pi pi-trash" class="p-button-danger"
              @click="handleDelete(slotProps.data.id)" />
          </div>
        </template>
      </Column>
    </DataTable>
    <div v-else>
      <h1>Nenhum produto por aqui...</h1>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { InputNumber } from 'primevue';
import { onBeforeMount, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const action = ref(0);
const editUser = ref({ id: null, nome: '', preco: '' });
const visible = ref(false);
const products = ref([]);


// função responsavel por editar o produto na api
async function handleEdit() {
  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/${editUser.value.id}`, {
      nome: editUser.value.nome,
      preco: editUser.value.preco
    });

    visible.value = false;
    toast.success("Produto editado com sucesso!", { position: "bottom-left" });
    action.value++;
  } catch (error) {
    toast.error("Erro ao atualizar produto!", { position: "bottom-left" })
  } finally {

  }
}

// Função que faz o set do editUser recebendo slotProps.data da linha da tabela
function openModal(product) {
  editUser.value = { ...product };
  visible.value = true;
}

// função responsavel por recuperar a lista de produtos da api
async function fetchProducts() {
  try {
    const res = await axios.get(import.meta.env.VITE_API_URL);
    products.value = res.data.products;
  } catch (error) {
    toast.error("Erro ao buscar produtos", { position: 'bottom-left' })
  }
};

// Função responsavel por deletar o produto
async function handleDelete(id) {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);
    toast.success("Produto deletado com sucesso!", { position: 'bottom-left' });
    action.value++;
  } catch (error) {
    toast.error("Erro ao deletar produto!", { position: 'bottom-left' })
  }
}

// Faz uma consulta na api antes de montar o componente
onBeforeMount(() => {
  fetchProducts();
});


// Verifica a todo momento se há alguma alteração no action e executa a busca na api
watch(action, (newValue, oldValue) => {
  if (newValue != oldValue) {
    fetchProducts();
  }
})



</script>

<style scoped>
.action-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
