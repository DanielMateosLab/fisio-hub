import React, { useEffect } from 'react'
import { useUser } from '../utils/hooks'
import Router from 'next/router'

const Index = () => {
  const { user } = useUser()

  useEffect(() => {
    const path = user ? '/user' : '/login'
    Router.push(path)
  })

  return null
}

export default Index