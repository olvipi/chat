import { BaseModel } from 'startupjs/orm'

export default class ChatsModel extends BaseModel {
  async getChatId (userId, contactId) {
    const $chat = this.root.query(this.getCollection(), {
      contacts: { $all: [userId, contactId] }
    })

    await $chat.subscribe()
    const chat = $chat.get()
    await $chat.unsubscribe()

    if (chat[0]) return chat[0].id

    const id = this.id()

    await this.root.add(this.getCollection(), {
      id,
      contacts: [userId, contactId],
      createdAt: Date.now(),
      updatedAt: Date.now()
    })

    return id
  }
}
