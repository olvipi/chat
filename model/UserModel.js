import { BaseModel } from 'startupjs/orm'

export default class UserModel extends BaseModel {
  async update (values) {
    const $user = this.at(values.id)
    await $user.subscribe()
    await $user.setEach({
      userName: values.userName,
      password: values.password,
      blocked: !!values.blocked,
      updatedAt: Date.now()
    })
    await $user.unsubscribe()
  }

  async reset () {
    await this.set('counter', 0)
  }
}
