import { BaseModel } from 'startupjs/orm'

export default class UsersModel extends BaseModel {
  async addSelf (values) {
    await this.root.add(this.getCollection(), {
      id: this.id(),
      userName: values.userName,
      password: values.password,
      blocked: !!values.blocked,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
  }

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
