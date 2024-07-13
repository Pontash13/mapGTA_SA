<template>
  <div class="map-wrap">
    <div class="map" id="map" ref="mapContainer"></div>
  </div>
</template>

<script>
//todo acertar esses caminhos absolutos
import "@maptiler/leaflet-maptilersdk";
import L from 'leaflet';
import {createForm} from '../../assets/MapFactory.js'
import '../../assets/Snogylop.js'

import MapMixin from "./MapMixin.js";
import 'leaflet-easybutton';

import config from '../../../config.js'

export default {
  name: 'Map',
  props:{
    geoJson: Object
  },
  mixins: [
    MapMixin
  ],
  data: () => ({
    mapInstance: null,
    styleId: config.styleId,
    apiKey: config.apiKey,
    json: createForm(),
    maxZoomLevel: 11,
    teste: true
  }),
  methods: {
    init(){
      this.mapInstance = L.map('map', {
        preferCanvas: true,
      }).setView([0, 0], 1);



      if(teste){
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.mapInstance);
      }
      else{
        const mtLayer = new L.MaptilerLayer({
          apiKey: this.apiKey,
          style: this.styleId,
        });
      }

      const geoJsonLayer = L.geoJSON(this.geoJson, {
        invert: true,
        style: () => ({
          color: '#84D9FA',
          weight: 2,
          fillColor: '#84D9FA',
          fillOpacity: 1
        }),
        pointToLayer: () => null // Não renderiza pontos
      }).addTo(this.mapInstance);

      this.mapInstance.fitBounds(L.geoJSON(geoJson).getBounds());

      L.control.scale().addTo(this.mapInstance);
    }
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    if (this.mapInstance) {
      this.mapInstance.remove();
    }
  }
};
</script>

<style scoped>
.map-wrap {
  position: relative;
  width: 100%;
  height: calc(100vh - 77px); /* calcula a altura da tela menos o cabeçalho */
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
