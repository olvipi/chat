import React, { FC, useMemo } from 'react'
import { $root, batch, observer, useValue } from 'startupjs'
import { Button, Div, ObjectInput } from '@startupjs/ui'
import './index.styl'

const fields = ['userName', 'password']

const getRequiredMessage = (text: string) => `${text} name not provided`

const Auth: FC = observer(() => {
  const [, $value] = useValue({})
  const [errors, $errors] = useValue<{
    userName?: string
    password?: string
    sign?: string
  }>({})

  const properties = useMemo(
    () => ({
      userName: {
        input: 'text',
        label: 'Name',
        placeholder: 'Enter your name',
        onChange: () => {
          batch(() => {
            $errors.at('sign').del()
            $errors.at('userName').del()
          })
        },
      },
      password: {
        input: 'password',
        label: 'Password',
        placeholder: 'Enter password',
        onChange: () => {
          batch(() => {
            $errors.at('sign').del()
            $errors.at('password').del()
          })
        },
      },
    }),
    []
  )

  const onEnter = async () => {
    const value = $value.get()

    fields.forEach(field => {
      if (!value?.[field]) {
        $errors.at(field).set(getRequiredMessage(properties[field].label))
      }
    })

    if (Object.keys($errors.get()).length) return

    const $users = $root.query('users', value)
    await $users.subscribe()
    const users = $users.get()

    await $users.unsubscribe()

    if (users.length) {
      console.log('users[0]', users[0])
      const $user = $root.scope('_session.user')
      await $user.set(users[0])
      console.log('$user.get()', $user.get())
      // emit('url', '/chats')
    } else $errors.set({ sign: 'Name or password is incorrect' })
  }

  return (
    <Div styleName='root'>
      <ObjectInput $value={$value} properties={properties} errors={errors} />
      <Button
        color={errors.sign ? 'attention' : 'primary'}
        styleName='sign-button'
        variant='flat'
        onPress={onEnter}
      >
        {errors?.sign || 'Sign In'}
      </Button>
    </Div>
  )
})

export default Auth
