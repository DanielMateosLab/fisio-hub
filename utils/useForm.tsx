import React, { FormEvent, ChangeEvent, useState} from "react"
import {Button, Grid, TextField, Typography} from "@material-ui/core";

type SupportedTypes = 'email' | 'password' | 'text'

type ValidationResponse = { error?: string }
type ValidationFunction = (value: any) => ValidationResponse

type SubmitCallback = () => Promise<void>

interface InputsShape {
  [key: string]: {
    type: SupportedTypes
    label: string
    validationFunction?: ValidationFunction
  }
}
interface InitialState {
  [key: string]: {
    value: string | boolean
    error: string
  }
}

/** Hook to create a form
 *  @param submitCallback Function called when the form is submitted.
 *  @param inputsShape Object with the corresponding form elements and their type.
 * */
const useForm = (inputsShape: InputsShape, submitCallback: SubmitCallback) => {
  let initialState: InitialState = {}
  let formElements = []

  for (const property in inputsShape) {
    // TODO: set the initial state values depending on the type.
    // Example: for checkbox it should be the boolean "false"
    if (inputsShape.hasOwnProperty(property)) {
      // if(inputsShape.type == "checkbox" || "select") ...
      initialState = {
        ...initialState,
        [property]: {
          value: '',
          error: ''
        }
      }
      formElements.push(property)
    }
  }

  const [ inputs, setInputs ] = useState(initialState)
  const [ error, setError ] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      if (event) {
        event.preventDefault()

        await submitCallback()
      }
        return null
    } catch (e) {
      setError(e.message)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()

    let error = ''
    const { value, name } = event.currentTarget
    const validationFunction = inputsShape[name].validationFunction

    if (validationFunction) {
      const { error: validationError } = validationFunction(value)
      error = validationError ? validationError : ''
    }

    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: {
        value,
        error
      }}))
  }

  const parseInputs = (inputs: InitialState) => {
    let result: any = {}

    for (const property in inputs) {
      result[property] = inputs[property].value
    }

    return result
  }

  const form = (
    <form onSubmit={handleSubmit} >
      <Grid container>
        {
          formElements.map(element => {
            const { type, label } = inputsShape[element]
            const { value, error } = inputs[element]

            return (
              <Grid key={element} item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth={true}
                  name={element}
                  type={type}
                  label={label}
                  margin="normal"
                  value={value}
                  error={!!error}
                  helperText={error}
                  onChange={handleInputChange}
                />
              </Grid>
            )
          })
        }
        <Grid item xs={12} container justify="center">
          <Button style={{marginTop: 16}} variant="contained" type="submit" color="primary">Iniciar sesión</Button>
        </Grid>
        <Grid item xs={12}>
          { error &&
          <Typography variant="body1" color="error"> error </Typography>
          }
        </Grid>
      </Grid>
    </form>
  )

  return {
    inputs: parseInputs(inputs),
    form
  }
}

export default useForm