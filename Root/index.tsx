import React from 'react'
import { Platform, SafeAreaView, KeyboardAvoidingView } from 'react-native'
import init from 'startupjs/init'
import App from 'startupjs/app'
import { observer, model, $root } from 'startupjs'
import { registerPlugins } from 'startupjs/plugin'
import { uiAppPlugin, Button, Div, H5, Row, Span } from '@startupjs/ui'
import { BASE_URL } from '@env'
import orm from '../model'
import { initAuthApp } from '@startupjs/auth'
import { LoginForm, RegisterForm } from '@startupjs/auth-local'
import { SIGN_UP_URL } from '@startupjs/auth/isomorphic'
// Frontend micro-services
import * as main from '../main'
import * as admin from '../admin'

import './index.styl'

//@ts-ignore
if (Platform.OS === 'web') window.model = model

// Init startupjs connection to server and the ORM.
// baseUrl option is required for the native to work - it's used
// to init the websocket connection and axios.
// Initialization must start before doing any subscribes to data.
init({ baseUrl: BASE_URL, orm })

registerPlugins({
  '@startupjs/app': [[uiAppPlugin, { defaultEnable: true }]],
})

const renderActions = ({ onSubmit }) => (
  <Div styleName='actions'>
    <Button color='primary' variant='flat' onPress={onSubmit}>
      Sign In
    </Button>
    <Row styleName='footer' align='center' vAlign='center'>
      <Span>Don't have an account?</Span>
      <Button
        color='primary'
        variant='text'
        onPress={() => $root.emit('url', SIGN_UP_URL)}
      >
        Sign up
      </Button>
    </Row>
  </Div>
)

const getCaptionForm = slide =>
  slide === 'sign-in' ? 'Please sign in' : 'Please sign up'

export default observer(() => {
  const auth = initAuthApp({
    localForms: {
      'sign-in': <LoginForm renderActions={renderActions} />,
      'sign-up': <RegisterForm />,
    },
    renderForm: function ({ slide, localActiveForm }) {
      return (
        <SafeAreaView>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <Div styleName='container'>
              <Row align='center'>
                <H5 align='center' bold>
                  {getCaptionForm(slide)}
                </H5>
              </Row>
              <Div style={{ marginTop: 16 }}>{localActiveForm}</Div>
            </Div>
          </KeyboardAvoidingView>
        </SafeAreaView>
      )
    },
  })

  return <App apps={{ auth, main, admin }} />
})
