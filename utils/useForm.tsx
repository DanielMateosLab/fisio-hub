import React, { FormEvent, ChangeEvent, useState} from "react"
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// TODO: Make tests

/** HTML Input Elements supported. Depends on the type of value created in the form state.
 * Currently an empty string is created for all elements */
type SupportedTypes = 'email' | 'password' | 'text'

type ValidationResponse = { error?: string }
type ValidationFunction = (value: any) => ValidationResponse

interface InputsSchema {
  [key: string]: {
    type: SupportedTypes
    label: string
    /** Optional validation function */
    validationFunction?: ValidationFunction
  }
}
/** How the form elements state is kept */
interface InputsState {
  [key: string]: {
    value: string | boolean
    error: string
  }
}

interface FormResults {
  [key: string]: string | boolean
}
/** The callback fired when submitting the form.
 * Errors are caught and their message is printed above the submit button */
type SubmitCallback = (results: FormResults) => Promise<void>

interface UseForm {
  <InputsSchema>(inputSchema: InputsSchema, submitFunction: (results: Record<keyof InputsSchema, any>) => void): {
    form: React.ReactNode
  }
}


/** Form Builder Hook
 *  @param submitCallback Function called when the form is submitted.
 *  @param inputsSchema Object with the corresponding form elements and their type.
 * */
const useForm = (inputsSchema: InputsSchema, submitCallback: SubmitCallback) => {
  let initialState: InputsState = {}
  let formElements = []

  // Set the initialState and the formElements out of the inputSchema
  for (const property in inputsSchema) {
    // TODO: set the initial state values depending on the type.
    // Example: for checkbox it should be the boolean "false"
    if (inputsSchema.hasOwnProperty(property)) {
      // if(inputsSchema.type == "checkbox" || "select") ...
      initialState[property] = {
        value: '',
        error: ''
      }
      formElements.push(property)
    }
  }

  const [ inputs, setInputs ] = useState(initialState)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()

    let error = ''
    const { value, name } = event.currentTarget
    const validationFunction = inputsSchema[name].validationFunction

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

  /** Removes properties related to the form management returning only the value. */
  const parseInputs = (inputs: InputsState): FormResults => {
    let result: any = {}

    for (const property in inputs) {
      result[property] = inputs[property].value
    }

    return result
  }

  // Property where the submitCallback error message is stored
  const [ error, setError ] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()

      await submitCallback()
      setError('')
      return null
    } catch (e) {
      setError(e.message)
    }
  }


  const form = (
    <form onSubmit={handleSubmit} >
      <Grid container>
        {
          formElements.map(element => {
            const { type, label } = inputsSchema[element]
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