import React from 'react'
import { StoresContext } from '../contexts'

export const useStores = () => React.useContext(StoresContext)
