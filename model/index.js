import UsersModel from './UsersModel'
import UserModel from './UserModel'

export default function (racer) {
  racer.orm('users', UsersModel)
  racer.orm('users.*', UserModel)
}
