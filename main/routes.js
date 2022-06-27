import { filters } from '@startupjs/auth/isomorphic'

export default (components = {}) => [
  {
    path: '/',
    exact: true,
    component: components.PHome,
    filters: [filters.isLoggedIn()],
  },
  {
    path: '/contacts',
    exact: true,
    component: components.PContacts,
    // redirect: '/'
  }
]
