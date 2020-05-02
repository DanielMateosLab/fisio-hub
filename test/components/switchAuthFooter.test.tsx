/** @jest-environment jsdom */
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import SwitchAuthFooter from '../../components/switchAuthFooter'

describe('SwitchAuthFooter', () => {
  let getByText: any
  const props = {
    auxiliaryText: 'mockAuxiliaryText',
    linkText: 'mockLinkText',
    href: '/mock/route'
  }

  beforeEach(() => {
    const renderResult = render(
      <SwitchAuthFooter {...props}/>
    )
    getByText = renderResult.getByText
  })
  afterEach(() => {
    getByText = null
  })

  it('should render the auxiliary text', () => {
    const { auxiliaryText } = props

    expect(getByText(auxiliaryText)).toBeInTheDocument()
  })
  it('should render the link with the provided attributes', () => {
    const { linkText, href } = props
    const link = getByText(linkText)

    expect(link).toHaveAttribute('href', href)
  })
})