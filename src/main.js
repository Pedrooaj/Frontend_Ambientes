import { createApp } from 'vue'
import { Button, Column, DataTable, InputText, InputNumber, Message, Dialog } from 'primevue';
import { router } from './appRoutes';
import './style.css'
import App from './App.vue';
import 'vue-toastification/dist/index.css';
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Toast from "vue-toastification";

const app = createApp(App);



app.use(router);
app.component('Button', Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputNumber', InputNumber);
app.component('InputText', InputText);
app.component('Message', Message);
app.component('Dialog', Dialog);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});


app.use(Toast);


app.mount('#app');

