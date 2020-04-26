import { useField, FieldHookConfig } from 'formik'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import React from 'react'

interface CustomProperties {
  label: string,
}

const CustomTextInput = ({ label, ...props }: FieldHookConfig<any> & CustomProperties) => {
  const [field, meta] = useField(props)
  const error = meta.touched && meta.error ? meta.error : null
  if (!props.type) {
    props.type = 'text'
  }

  return (
    <Grid item xs={12}>
      <TextField
        {...field}
        type={props.type}
        label={label}
        variant="outlined"
        fullWidth={true}
        margin="normal"
        error={!!error}
        helperText={error}
      />
    </Grid>
  )
}

export default CustomTextInput