import { createApp } from "vue";
import App from './App.vue';
import router from './router';


import './style.css';
import 'leaflet/dist/leaflet.css';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import "@maptiler/leaflet-maptilersdk";
import 'leaflet.bigimage/dist/Leaflet.BigImage.min.css';

createApp(App).use(router).mount('#app')