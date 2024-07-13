<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<script>
import "@maptiler/leaflet-maptilersdk";
import L from 'leaflet';
import 'leaflet-maskcanvas';
import '../assets/Snogylop.js'
import {createForm} from '../assets/MapFactory.js'
import config from '../../config.js'

export default {
  name: 'Map',
  data: () => ({
    mapContainer: null,
    mapInstance: null,
    styleId: config.styleId,
    apiKey: config.apiKey,
    json: createForm(),
    maxZoomLevel: 11
  }),

  mounted() {
    this.mapContainer = this.$refs.mapContainer;

    // Geojson
    const geoJson = JSON.parse(this.json);

    // Cria o mapa no elemento mapContainer
    this.mapInstance = L.map(this.mapContainer, {
      minZoom: this.maxZoomLevel,
      maxZoom: 30
    }).setView([0, 0], this.maxZoomLevel);

    const mtLayer = new L.MaptilerLayer({
      apiKey: this.apiKey,
      style: this.styleId,
    });
    this.mapInstance.addLayer(mtLayer);

    // this.mapInstance.touchZoom.disable();
    // this.mapInstance.doubleClickZoom.disable();
    // this.mapInstance.scrollWheelZoom.disable();
    // this.mapInstance.boxZoom.disable();
    // this.mapInstance.keyboard.disable();


    const geoJsonLayer = L.geoJSON(geoJson, {
      invert: true,
      style: () => ({
        color: '#000',
        weight: 2,
        fillColor: '#6F89AB',
        fillOpacity: 1
      }),
      pointToLayer: () => null // Não renderiza pontos
    }).addTo(this.mapInstance);

    this.mapInstance.fitBounds(L.geoJSON(geoJson).getBounds());

  },
  methods: {

  },
  beforeDestroy() {
    // Limpa o mapa ao desmontar o componente
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
