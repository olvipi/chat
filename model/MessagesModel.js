import { BaseModel } from 'startupjs/orm'

export default class MessagesModel extends BaseModel {
  async addMessage (chatId, userId, text) {
    await this.root.add(this.getCollection(), {
      id: this.id(),
      chatId,
      userId,
      text,
      edited: false,
      deleted: false,
      received: false,
      read: false,
      createdAt: Date.now(),
      updatedAt: Date.now()
    })
  }
}
