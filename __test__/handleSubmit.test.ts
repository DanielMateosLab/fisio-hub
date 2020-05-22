describe.skip('hanldeSubmit', () => {
  const setSubmitError = jest.fn()

  afterEach(() => {
    expect(setSubmitError).toHaveBeenCalled()
  })

  it('should call fetch with POST method, application/json as content-type and the values as body', () => {

  })
  it('should call setSubmitError with "Comprueba tu conexión y vuelve a intentarlo" when fetch fails', () => {

  })
  describe('not OK response with body', () => {
    it('should call setFieldError with a Field Validation Error response with errors', () => {

    })
    it('should call setSubmitError with the response message')
  })
  it('should call setSubmitError with the res status and status text when there is no body', () => {

  })
})