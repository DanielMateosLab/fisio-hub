/** @jest-environment jsdom */
// @ts-nocheck
import * as React from 'react'
import { render, RenderResult } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Register from '../../pages/register'

describe('/register', () => {
  let renderResult: RenderResult

  beforeEach(() => {
    renderResult = render(<Register />)
  })
  afterEach(() => {
    renderResult = null
  })

  it('should have "Regístrate" as title', () => {
    const { getByText } = renderResult
    expect(getByText('Regístrate')).toBeInTheDocument()
  })
  it('should have a link to /register with a link "Inicia sesión"', () => {
    const { getByText } = renderResult
    const link = getByText('Inicia sesión')

    expect(link).toHaveAttribute('href', '/login')
  })
})