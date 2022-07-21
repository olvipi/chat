import { FC } from 'react'

interface IComponents {
  PUsers: FC
}

export default (components: IComponents) => [
  {
    path: '/users',
    exact: true,
    component: components?.PUsers,
  },
]
