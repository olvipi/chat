export interface IUser {
  id: string
  firstName: string
  lastName: string
  description?: string
  avatarUrl?: string
}

export interface IChat {
  id: string
  contacts: string[]
  createdAt: number
  updatedAt: number
}

export interface IMessage {
  id: string
  chatId: string
  userId: string
  text: string
  edited: boolean
  deleted: boolean
  received: boolean
  read: boolean
  createdAt: number
  updatedAt: number
}
