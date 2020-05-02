/** @jest-environment jsdom */
// @ts-nocheck
import * as React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { useUser } from '../../utils/hooks'
import { mockProfessional } from '../testUtils'
import User from '../../pages/user'
import Router from 'next/router'

jest.mock('next/router')
jest.mock('../../utils/hooks')

describe('/user', () => {
  let renderResult

  afterEach(() => {
    renderResult = null
  })

  it('should show the user first name and last name', () => {
    useUser.mockImplementation(() => ({
      user: mockProfessional
    }))

    const { firstName, lastName } = mockProfessional
    const { getByText } = render(<User />)

    expect(getByText(new RegExp(firstName))).toBeInTheDocument()
    expect(getByText(new RegExp(lastName))).toBeInTheDocument()
  })
  it('should show the user email', () => {
    useUser.mockImplementation(() => ({
      user: mockProfessional
    }))

    const { email } = mockProfessional
    const { getByText } = render(<User />)

    expect(getByText(new RegExp(email))).toBeInTheDocument()
  })
  it('return an empty div and redirect to /login', () => {
    useUser.mockImplementation(() => ({
      user: null
    }))

    const routerSpy = jest.spyOn(Router, 'push')

    const { getByText } = render(<User />)

    const element = getByText('', {selector: 'div'})

    expect(element).toBeInTheDocument()
    expect(routerSpy).toBeCalledWith('/login')
  })
})