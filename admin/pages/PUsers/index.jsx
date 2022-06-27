import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { observer, useValue } from 'startupjs'
import { Button, Content, Div, Modal, Row, Span } from '@startupjs/ui'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Users, AddUser } from 'components'
import './index.styl'

export default observer(function PUsers() {
  const [open, setOpen] = useState(false)
  const [editUser, setEditUser] = useState({})

  const onStartEdit = user => {
    setEditUser(user)
    setOpen(true)
  }

  const onClose = () => {
    if(editUser?.id) setEditUser({})
    setOpen(false)
  }

  return (
    <ScrollView styleName='root'>

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
          <Button color='primary' icon={faPlus} onPress={() => setOpen(true)}>Create User</Button>
        </Row>
        <Div styleName='content'>
          <Users onStartEdit={onStartEdit}/>
        </Div>
      </Content>

    </ScrollView>
  )
})
