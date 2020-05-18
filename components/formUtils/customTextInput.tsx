import { FieldHookConfig, useField } from 'formik'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import React from 'react'

const CustomTextInput = ({ ...props }: FieldHookConfig<any> & TextFieldProps) => {
  const [field, meta] = useField(props)

  delete props.validate // Causes an error if passed to TextField

  const error = meta.touched && meta.error ? meta.error : null
  if (!props.type) {
    props.type = 'text'
  }

  return (
    <Grid item xs={12}>
      <TextField
        {...field}
        {...props}
        type={props.type}
        variant="outlined"
        fullWidth={true}
        margin="normal"
        error={!!error}
        helperText={error}
        InputProps={props.InputProps}
        disabled={props.disabled}
      />
    </Grid>
  )
}

export default CustomTextInput