import React from 'react'
import { UserStore } from '../stores'

export const storesContext = React.createContext({
  userStore: new UserStore(),
})
