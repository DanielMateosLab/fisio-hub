import React, { useEffect } from 'react'
import { useUser } from '../utils/hooks'
import Router from 'next/router'

export default () => {
  const { user } = useUser()

  useEffect(() => {
    const path = user ? '/user' : '/login'
    Router.push(path)
  })

  return null
}