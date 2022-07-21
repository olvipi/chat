import { filters } from '@startupjs/auth/isomorphic'
import { FC } from 'react'

interface IComponents {
  PHome: FC,
  PContacts: FC,
  PChat: FC,
}

export default (components: IComponents) => [
  {
    path: '/',
    exact: true,
    component: components?.PHome,
    filters: [filters.isLoggedIn()],
  },
  {
    path: '/contacts',
    exact: true,
    component: components?.PContacts,
    // redirect: '/'
  },
  {
    path: '/chats/:chatId',
    exact: true,
    component: components?.PChat
  }
]
