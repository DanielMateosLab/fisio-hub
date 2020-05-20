import React, { useEffect } from 'react'
import Router from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'

const Index = () => {
  const { user } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const redirectPath = user ? '/user' : '/login'
    Router.push(redirectPath)
  })

  return null
}

export default Index