import React, { FC, PropsWithChildren } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'

const InputWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {children}
    </KeyboardAvoidingView>
  )
}

export default InputWrapper
