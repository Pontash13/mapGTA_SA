import { createMemoryHistory, createRouter } from 'vue-router'
import Central from '../views/Central.vue';
import ViewMap from '../views/ViewMap.vue';

const routes = [
  { path: '/', name: 'Central', component: Central},
  { path: '/viewMap', name: 'ViewMap', component: ViewMap, props: true},
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;