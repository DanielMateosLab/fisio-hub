/** @jest-environment jsdom */
// @ts-nocheck
import * as React from 'react'
import { render, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Login from 'pages/login'

describe('/login', () => {
  let renderResult: RenderResult

  beforeEach(() => {
    renderResult = render(<Login />)
  })
  afterEach(() => {
    renderResult = null
  })

  it('should have "Iniciar sesión" as title', () => {
    const { getByText } = renderResult
    expect(getByText('Iniciar sesión')).toBeInTheDocument()
  })
  it('should have a link to /register with a link "Regístrate"', () => {
    const { getByText } = renderResult
    const link = getByText('Regístrate')

    expect(link).toHaveAttribute('href', '/register')
  })
})