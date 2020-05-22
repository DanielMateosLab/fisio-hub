import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

interface FormFooterProps {
  submitError: string
  submitButtonText: string
  disabled: boolean
}

const FormFooter: React.FC<FormFooterProps> = ({submitError, submitButtonText, disabled, children}) => (
  <>
    {submitError && (
      <Grid item style={{ marginTop: 18 }} container justify="center" xs={12}>
        <Typography color="error" align="center" variant="h6">{submitError}</Typography>
      </Grid>
    )}
    <Grid item style={{ marginTop: 18 }} container justify="center" spacing={1}>
      <Grid item>
        <Button
          type="submit"
          disabled={ disabled }
          variant="contained"
          color="primary"
        > { submitButtonText } </Button>
      </Grid>
      <Grid item> { children } </Grid>
    </Grid>
  </>
)
export default  FormFooter