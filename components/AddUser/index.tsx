import React, { FC, useEffect, useMemo } from 'react'
import { Button, Div, ObjectInput, Row } from '@startupjs/ui'
import { batch, observer, useQuery, useValue } from 'startupjs'
import _omit from 'lodash/omit'
import './index.styl'
import { IUser } from 'helpers/types'

const fields = ['userName', 'password', 'passwordRepeat']

const getRequiredMessage = text => `${text} name not provided`

interface AddUserProps {
  editUser?: IUser
  onClose: () => void
}

const AddUser: FC<AddUserProps> = observer(({ editUser, onClose }) => {
  const [, $users] = useQuery('users', {})
  const [, $value] = useValue({})
  const [errors, $errors] = useValue({})

  useEffect(() => {
    console.log('editUser', editUser)

    if (!!editUser) {
      $value.set({ ...editUser, passwordRepeat: editUser.password })
    }
  }, [editUser])

  const properties = useMemo(
    () => ({
      // userName: {
      //   input: 'text',
      //   label: 'User Name',
      //   onFocus: () => $errors.at('userName').del()
      // },
      // password: {
      //   input: 'password',
      //   label: 'Password',
      //   onFocus: () => $errors.at('password').del()
      // },
      // passwordRepeat: {
      //   input: 'password',
      //   label: 'Repeat Password',
      //   onFocus: () => $errors.at('passwordRepeat').del()
      // },
      blocked: {
        input: 'checkbox',
        label: 'User is blocked',
        variant: 'switch',
      },
    }),
    []
  )

  const onCancel = () => {
    batch(() => {
      $value.set({})
      $errors.set({})
    })
    onClose()
  }

  const onSave = async () => {
    const value = $value.get()

    // fields.forEach(field => {
    //   if (!value?.[field]) {
    //     $errors.at(field).set(getRequiredMessage(properties[field].label))
    //   }
    // })

    // if (value?.password !== value?.passwordRepeat) {
    //   $errors.set('passwordRepeat', 'Passwords do not match')
    // }

    if (Object.keys($errors.get()).length) return

    console.log('value', value)

    if (editUser?.id) {
      await $users.update({ ...editUser, ...value })
    } else {
      await $users.addSelf(value)
    }

    onCancel()
  }

  return (
    <Div styleName='root'>
      <ObjectInput $value={$value} errors={errors} properties={properties} />

      <Row styleName='footer' align='right' pushed>
        <Button onPress={onCancel}>Cancel</Button>
        <Button color='primary' pushed onPress={onSave}>
          {editUser?.id ? 'Save' : 'Create'}
        </Button>
      </Row>
    </Div>
  )
})

export default AddUser
