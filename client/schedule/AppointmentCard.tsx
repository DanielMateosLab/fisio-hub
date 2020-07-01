import React, { useEffect, useState } from 'react'
import { Appointment } from '../../common/entityTypes'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { Euro, Message } from '@material-ui/icons'
import { brown, green, teal } from '@material-ui/core/colors'
import moment from 'moment'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'

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
  icon: {
    position: 'relative',
  }
})

interface Props {
  appointment: Appointment
}

const AppointmentCard: React.FC<Props> = ({ appointment }) => {
  const classes = useStyles()

  const { date, patient, service, payment } = appointment

  let patientName = patient.firstName + ' ' + patient.lastName
  if (patientName.length >= 30) {
    const words = patientName.split(' ')
    words.pop()
    patientName = words.join(' ')
  }

  const [ largeCard, setLargeCard ] = useState(false)

  const card = React.createRef<HTMLDivElement>()
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      entry.contentRect.width >= 645 ? setLargeCard(true) : setLargeCard(false)
    }
  })
  useEffect(() => {
    if (!card.current) return
    resizeObserver.observe(card.current)
    return () => resizeObserver.disconnect()
  }, [])

  return (
    <Paper className={classes.root} ref={card}>
      <Grid container style={{ height: '100%' }} spacing={2}>
        <Grid item container>
          <Grid item xs={12} container alignItems="center">
            <Typography color="textSecondary" variant="caption">
              { moment(date).format("HH:mm") } {' '} { service.name }
            </Typography>
            <Grid item xs />
            <Message fontSize="small" />
            { payment && <Euro style={{ color: green['500'] }} fontSize="small"/> }
          </Grid>
          <Grid item xs={12}>
            <Typography color="primary" variant={ largeCard ? 'h5' : 'subtitle2' }>{ 'a'.padEnd(25, 'b') }</Typography>
          </Grid>
        </Grid>
        { largeCard && (
          <Grid item xs container alignItems="center">
            <Message fontSize="large"/>
            { payment && <Euro style={{ color: green['500'] }} fontSize="large"/> }
          </Grid>
        ) }
      </Grid>
    </Paper>
  )
}

export default AppointmentCard