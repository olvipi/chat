import React, { FC, useState } from 'react'
import { ScrollView } from 'react-native'
import { observer, u } from 'startupjs'
import { Button, Content, Div, Modal, Row, Span } from '@startupjs/ui'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Users, AddUser } from 'components'
import { IUser } from 'helpers/types'
import './index.styl'

const PUsers: FC = observer(() => {
  const [open, setOpen] = useState(false)
  const [editUser, setEditUser] = useState<IUser | null>(null)

  const onStartEdit = (user: IUser) => {
    setEditUser(user)
    setOpen(true)
  }

  const onClose = () => {
    if (editUser?.id) setEditUser(null)
    setOpen(false)
  }

  return (
    <ScrollView style={{ flex: 1, paddingVertical: u(2) }}>
      <Modal
        title={`${editUser?.id ? 'Edit' : 'Create new'} user`}
        visible={open}
        onRequestClose={onClose}
      >
        <AddUser editUser={editUser} onClose={onClose} />
      </Modal>

      <Content full width='full'>
        <Row align='between' vAlign='center'>
          <Row align='center' full>
            <Span bold>Users</Span>
          </Row>
          <Button color='primary' icon={faPlus} onPress={() => setOpen(true)}>
            Create User
          </Button>
        </Row>
        <Div styleName='content'>
          <Users onStartEdit={onStartEdit} />
        </Div>
      </Content>
    </ScrollView>
  )
})

export default PUsers
