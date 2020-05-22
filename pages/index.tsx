import React, { useEffect } from 'react'
import Router from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '../client/redux/rootReducer'

const Index = () => {
  const { user } = useSelector((state: RootState) => state.session)

  useEffect(() => {
    const redirectPath = user ? '/user' : '/login'
    Router.push(redirectPath)
  })

  return null
}

export default Index