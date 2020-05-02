// @ts-nocheck
import Router from 'next/router'
import { useGuestOnly } from '../utils/hooks'
import useSWR from 'swr'

jest.mock('next/router')
jest.mock('swr')

describe('useGuestOnly', () => {
  let backSpy
  beforeEach(() => {
    backSpy = spyOn(Router, 'back')
  })
  afterEach(() => {
    backSpy = null
  })

  it('should call back() with a user', () => {
    useSWR.mockImplementation(() => ({
      data: {
        professional: true
      }
    }))
    useGuestOnly()

    expect(backSpy).toHaveBeenCalled()
  })
  it('should do nothing when user is not defined', () => {
    useSWR.mockImplementation(() => ({
      data: {
        professional: null
      }
    }))
    useGuestOnly()

    expect(backSpy).not.toHaveBeenCalled()
  })
})