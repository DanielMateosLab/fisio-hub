/** @jest-environment jsdom */
// @ts-nocheck
import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Index from '../../pages'
import Router from 'next/router'

jest.mock('next/router')

describe('/index', () => {
  let renderResult

  afterEach(() => {
    renderResult = null
  })

  it('should redirect to /user when there is a user logged in', () => {
    const routerSpy = jest.spyOn(Router, 'push')
    render(<Index />)

    expect(routerSpy).toHaveBeenCalledWith('/user')
  })
  it('should redirect to /login when there is no user', () => {
    const routerSpy = jest.spyOn(Router, 'push')
    render(<Index />)

    expect(routerSpy).toHaveBeenCalledWith('/login')
  })
  it('should render an empty div', () => {
    const { getByText } = render(<Index />)

    const element = getByText('', {selector: 'div'})

    expect(element).toBeInTheDocument()
  })
})