import React, { useState } from 'react'
import { Button, Icon, Row, Span, Table, Thead, Tbody, Tr, Th, Td } from '@startupjs/ui'
import { observer, useQuery } from 'startupjs'
import { faLock, faLockOpen, faPen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import './index.styl'


const schema = [
  {
    index: 'firstName',
    title: 'Name',
  },
  {
    index: 'lastName',
    title: 'Last Name',
  },
  {
    index: 'blocked',
    title: 'Blocked User',
    type: 'bool'
  },
  {
    index: 'createdAt',
    title: 'Created',
    type: 'date'
  },
  {
    index: 'updatedAt',
    title: 'Updated',
    type: 'date'
  },
  {
    index: '',
    title: 'Actions',
    type: 'action'
  }
]

const getFormattedText = (value, type) => {
  if (type === 'date') return moment(value).format('L')

  if (type === 'bool') return (
    <Icon
      styleName={value ? 'attention' : 'success'}
      icon={value ? faLock : faLockOpen}
    />
  )

  return value
}

export default observer(function Users({ onStartEdit })  {
  const [users = []] = useQuery('users', {})
  console.log('users', users)
  const hoverOptions = {
    style: {
      cursor: 'default',
    },
    hoverStyle: {
      backgroundColor: '#ebf8fd',
    },
    activeStyle: {
      opacity: 1,
      backgroundColor: '#ebf8fd',
    },
    onPress: () => undefined,
  }


  return (
    <Table styleName='root'>
      <Thead>
        <Tr>
          {schema.map(item => (
            <Th key={`${item.index}_th`} {...hoverOptions}>
              <Span bold italic>{item.title}</Span>
            </Th>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {users.map(user => (
          <Tr key={user.id} {...hoverOptions}>
            {schema.map(item => (
              <Td key={`${item.index}_th`} {...hoverOptions}>
                {item.type === 'action'
                  ? (
                    <Row align='right'>
                      <Button
                        color='additional4'
                        icon={faPen}
                        variant='text'
                        onPress={() => onStartEdit(user)}
                      />
                    </Row>
                  )
                  : getFormattedText(user[item.index], item.type)
                }
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
})
