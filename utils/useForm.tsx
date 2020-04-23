import React, { FormEvent, ChangeEvent, useState } from "react"
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// TODO: Make tests

/** HTML Input Elements supported. Depends on the type of value created in the form state.
 * Currently an empty string is created for all elements */
type SupportedHtmlElementTypes = 'email' | 'password' | 'text'

interface ValidationFunction {
  (value: any, formValues?: any): string | void
}

interface InputsSchema {
  [key: string]: {
    type: SupportedHtmlElementTypes
    label: string
    /**
     * @param value The value of the input element
     * @param formValues The an object containing all the inputs values
     * @returns reason - If validation fails, a string containing information about the error
     */
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

/** Type of the result values.
 * Depends on {SupportedHtmlElementTypes}
 */
type ResultValues = string

interface UseForm {
  <T extends InputsSchema>(
    inputSchema: T,
    submitCallback: (results: Record<keyof T, ResultValues>) => any,
    submitButtonText: string
  ): React.ReactNode
}

/** Form Builder Hook
 *  @param submitCallback Function called when the form is submitted.
 *  @param inputsSchema Object with the corresponding form elements and their type.
 *  @returns form The form component
 * */
const useForm: UseForm = (inputsSchema, submitCallback, submitButtonText) => {
  let initialState: InputsState = {}
  let formElements = []

  // Set the initialState and the formElements out of the inputSchema
  for (const property in inputsSchema) {
    // TODO: set the initial state values depending on the type.
    // Example: for checkbox it should be the boolean "false"
    // if(inputsSchema.type == "checkbox" || "select") ...
    if (inputsSchema.hasOwnProperty(property)) {
      initialState[property] = {
        value: '',
        error: ''
      }
      formElements.push(property)
    }
  }

  const [ inputs, setInputs ] = useState(initialState)

  /** Removes properties related to the form management returning only the value. */
  const parseInputs = (inputs: InputsState): Record<keyof typeof inputsSchema, ResultValues> => {
    // This any time leds to typescript compiling errors when typing the SubmitFunction return value
    // Try to find a better solution than using Record
    let result: any = {}

    for (const property in inputs) {
      result[property] = inputs[property].value
    }

    return result
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist()

    let error = ''
    const { value, name } = event.currentTarget

    const validationFunction = inputsSchema[name].validationFunction

    if (validationFunction) {
      const validationError = validationFunction(value, parseInputs(inputs))
      error = validationError ? validationError : ''
    }

    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: {
        value,
        error
      }}))
  }

  // Property where the submitCallback error message is stored
  const [ error, setError ] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const error = await submitCallback(parseInputs(inputs))
      error ? setError(error) : setError('')
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
          <Button style={{marginTop: 16}} variant="contained" type="submit" color="primary">
            { submitButtonText }
          </Button>
        </Grid>
        <Grid item xs={12}>
          { error &&
          <Typography variant="body1" color="error"> { error } </Typography>
          }
        </Grid>
      </Grid>
    </form>
  )

  return form
}

export default useForm