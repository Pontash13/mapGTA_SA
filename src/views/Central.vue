<template>
  <div class="body">
    <h2 class="corner-text">gta sa map style</h2>
    <div class="input-container">
      <input type="text" v-model="textInput" @input="fetchCities" class="gta-input">
      <select v-if="suggestions.length" v-model="selectedCity" class="gta-dropdown" size="5">
        <option v-for="city in suggestions" :key="city.id" :value="city.nome">
          {{ city.nome }}
        </option>
      </select>
      <button @click="navigateTo" :disabled="!selectedCity" class="gta-button">Enviar</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Central',
  data() {
    return {
      textInput: '',
      suggestions: [],
      selectedCity: '',
      selectedCityId: null,
    };
  },
  watch: {
    selectedCity(newCity) {
      if (newCity) {
        const city = this.suggestions.find(city => city.nome === newCity);
        this.selectedCityId = city ? city.id : null;
        this.textInput = newCity;
        this.suggestions = [];
      } else {
        this.selectedCityId = null;
      }
    },
  },
  methods: {
    fetchCities() {
      if (this.textInput.length > 2) {
        axios
          .get('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
          .then(response => {
            const cities = response.data;
            this.suggestions = cities.filter(city =>
              city.nome.toLowerCase().includes(this.textInput.toLowerCase())
            );
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        this.suggestions = [];
      }
    },
    navigateTo() {
      if (this.selectedCityId) {
        this.$router.push({ name: 'Map' })
      }
    },
  },
};
</script>

<style scoped>
.body {
  color: white;
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: black;
  position: relative;
}

.corner-text {
  position: absolute;
  top: 0px;
  left: 30px;
  color: #f8f8f8;
  font-family: 'backett', sans-serif;
  font-size: 70px;
}

.input-container {
  position: relative;
  width: 500px;
}

.gta-input {
  padding: 10px;
  font-size: 50px;
  border: 2px solid #f8f8f8;
  border-radius: 6px;
  background-color: #212529;
  color: #f8f8f8;
  font-family: 'pricedow', sans-serif;
  text-transform: uppercase;
  outline: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 100%;
}

.gta-dropdown {
  margin-top: -2px;
  padding: 10px;
  font-size: 32px;
  border: 2px solid #f8f8f8;
  border-radius: 6px;
  background-color: #212529;
  color: #f8f8f8;
  font-family: 'pricedow', sans-serif;
  text-transform: uppercase;
  outline: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 105%;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
}

.gta-dropdown::-webkit-scrollbar {
  width: 12px;
}

.gta-dropdown::-webkit-scrollbar-track {
  background: #212529;
  border-radius: 6px;
}

.gta-dropdown::-webkit-scrollbar-thumb {
  background-color: #f8f8f8;
  border-radius: 6px;
  border: 3px solid #212529;
}

.gta-dropdown::-webkit-scrollbar-thumb:hover {
  background-color: #e0e0e0;
}

.gta-dropdown {
  scrollbar-width: thin;
  scrollbar-color: #f8f8f8 #212529;
}

.gta-button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 30px;
  border: 2px solid #f8f8f8;
  border-radius: 6px;
  background-color: #212529;
  color: #f8f8f8;
  font-family: 'pricedow', sans-serif;
  text-transform: uppercase;
  outline: none;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 105%;
  transition: background-color 0.3s, color 0.3s;
}

.gta-button:disabled {
  background-color: #444;
  color: #888;
  cursor: not-allowed;
}

.gta-button:hover:not(:disabled) {
  background-color: #1F5B31;
  color:  #888;
}
</style>
