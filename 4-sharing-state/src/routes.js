import Home from './Home';
import Other from './Other';

const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/other',
    component: Other,
    exact: true
  }
];

export default routes;
