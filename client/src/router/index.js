import Dashboard from '@/components/Dashboard.vue';
import LandingPage from '@/components/LandingPage.vue';

const routes = [
  {
    path: '/',
    name: 'landing.page',
    component: LandingPage,
  },
  {
    path: '/dashboard',
    name: 'home',
    component: Dashboard,
  },
];

export default routes;
