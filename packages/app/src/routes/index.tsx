import * as React from 'react'
import { NativeRouter, Route, Switch } from 'react-router-native'

export const Routes = () => (
  <NativeRouter initialEntries={['/']}>
    <Switch />
  </NativeRouter>
)
