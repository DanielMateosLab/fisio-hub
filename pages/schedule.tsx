import React, { ReactNode, useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import teal from '@material-ui/core/colors/teal'
import ScheduleMenu from '../client/schedule/ScheduleMenu'
import ScheduleMain from '../client/schedule/ScheduleMain'
import moment, { Moment } from 'moment'
import AppointmentGap from '../client/schedule/AppointmentGap'

const gapHeight = 72

const useStyles = makeStyles(theme => ({
  pageContainer: {
    paddingTop: 24
  },
  gap: {
    height: gapHeight,
    borderBottom: `solid 1px ${teal['100']}`
  },
  headerStyleGap: {
    borderBottom: `solid 1px ${teal['100']}`,
    borderLeft: `solid 1px ${teal['100']}`,
    height: 16
  },
  appointmentsColumn: {
    borderLeft: `solid 1px ${teal['100']}`
  },
  timeColumn: {
    width: 48
  },
  timeText: {
    position: 'relative',
    bottom: 12
  },
  actualTimeLine: {
    width: '100%',
    border: `solid 1px ${theme.palette.secondary.main}`,
    position: 'relative',
    marginTop: -2,
    marginLeft: 48
  }
}))

export type ScheduleClasses = ReturnType<typeof useStyles>

export interface ProfessionalsData {
  name: string
  selected: boolean
}

export default () => {
  const classes = useStyles()

  const [ professionals, changeProfessionals ] = useState<ProfessionalsData[]>(
    [
      { name: 'Daniel Mateos', selected: true },
      { name: 'Jorge Calviño', selected: true },
      { name: 'Miriam Rodríguez', selected: true },
      { name: 'Simón Sánchez', selected: true },
      { name: 'Almudena Carrasco', selected: true },
      { name: 'José Manuel', selected: true },
      { name: 'Arturo Carrasco', selected: true },
      { name: 'María Luisa', selected: false },
      { name: 'Alejandro Miguel', selected: false },
    ]
  )
  const selectedProfessionals = professionals.filter(p => p.selected)

  const gapMinutes = 30
  const gapCount = 24 * 60 / gapMinutes
  const date = moment()

  function getGapDate(i: number) {
    const gapDate = date.clone()
    gapDate.hour(Math.trunc(i * gapMinutes / 60 ))
    gapDate.minute(i * gapMinutes % 60)
    return gapDate
  }

  const getGapTime = (i: number) => getGapDate(i).format('HH:mm')

  const getTimeLinePosition = (time: Moment) => {
    const hoursPosition = time.hour() * (60 / gapMinutes) * gapHeight
    const minutesPosition = (time.minute() + 1) * ( gapHeight / gapMinutes )

    return hoursPosition + minutesPosition
  }

  const [ timeLinePosition, setTimeLinePosition ] = useState(getTimeLinePosition(moment()))

  useEffect(() => {
    setTimeout(() => {
      setTimeLinePosition(getTimeLinePosition(moment()))
    }, 60000)
  }, [ timeLinePosition ])

  let gaps: ReactNode[] = []
  let hourGaps: ReactNode[] = []

  for (let i = 0; i < gapCount; i++) {
    gaps.push(
      <Grid item container className={classes.gap} key={i} tabIndex={-1}>
        <AppointmentGap date={getGapDate(i)} showTimeInEmptyGaps={selectedProfessionals.length == 1} />
      </Grid>
    )

    hourGaps.push(
      <Grid item container key={`timeGap.${i}`} tabIndex={-1}>
        <Grid item xs={9}>
          { i > 0 && selectedProfessionals.length == 1 &&
            <Typography className={classes.timeText} color="primary" variant="caption">
              { getGapTime(i) }
            </Typography>
          }
        </Grid>
        <Grid item xs={3} className={classes.gap} />
      </Grid>
    )
  }

  return (
    <Grid container className={classes.pageContainer}>
      <Grid item style={{ overflowY: 'auto', height: 'calc(100vh - 88px)', width: 240 }}>
        <ScheduleMenu {...{ professionals, changeProfessionals, selectedProfessionals }}/>
      </Grid>

      <Grid id="appointments" item container direction='column' xs>
        { !!selectedProfessionals.length && <ScheduleMain {...{ gaps, hourGaps, classes, selectedProfessionals, timeLinePosition }} /> }
      </Grid>

    </Grid>
  )
}