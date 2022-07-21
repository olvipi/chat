import ChatsModel from './ChatsModel'
import MessagesModel from './MessagesModel'
import UserModel from './UserModel'
import UsersModel from './UsersModel'

export default function (racer) {
  racer.orm('chats', ChatsModel)
  racer.orm('messages', MessagesModel)
  racer.orm('users', UsersModel)
  racer.orm('users.*', UserModel)
}
