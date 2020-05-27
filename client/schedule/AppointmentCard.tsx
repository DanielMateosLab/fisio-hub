import React from 'react'
import { Appointment } from '../../common/entityTypes'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Euro } from '@material-ui/icons'
import { brown, green, teal } from '@material-ui/core/colors'
import moment from 'moment'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  root: {
    zIndex: 2,
    width: '100%',
    margin: 4,
    padding: 8,
    cursor: 'pointer',
    backgroundColor: teal['50'],
    '&:hover': {
      backgroundColor: brown['50']
    },
    '&:active': {
      backgroundColor: teal['100']
    }
  },
  icons: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center'
  }
})

interface Props {
  appointment: Appointment
}

const AppointmentCard: React.FC<Props> = ({appointment}) => {
  const classes = useStyles()

  const { date, patient, service, payment } = appointment

  return (
    <Paper className={classes.root}>
      <Typography color="textSecondary" variant="caption">
        { moment(date).format("HH:mm") }
      </Typography>
      <Typography color="primary" variant="subtitle2">{ `${patient.firstName} ${patient.lastName}` }</Typography>
      <Typography variant="caption">{ service.name }</Typography>
      { payment && <Euro style={{ color: green['500'] }} fontSize="small" /> }
    </Paper>
  )
}

export default AppointmentCard