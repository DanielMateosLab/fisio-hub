import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

interface FormFooterProps {
  submitError: string
  isSubmitting: boolean
  submitButtonText: string
}

const FormFooter = ({submitError, isSubmitting, submitButtonText}: FormFooterProps) => (
  <>
    {submitError && (
      <Grid item style={{ marginTop: 18 }} container justify="center" xs={12}>
        <Typography color="error" variant="h6">{submitError}</Typography>
      </Grid>
    )}
    <Grid item style={{ marginTop: 18 }} container justify="center">
      <Button
        type="submit"
        disabled={isSubmitting}
        variant="contained"
        color="primary"
      > { submitButtonText } </Button>
    </Grid>
  </>
)
export default  FormFooter