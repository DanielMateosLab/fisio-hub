import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import ScheduleMenu from '../client/schedule/ScheduleMenu'
import moment from 'moment'
import { ObjectId } from 'bson'
import Schedule from '../client/schedule/Schedule'

const useStyles = makeStyles({
  pageContainer: { paddingTop: 24 },
  scheduleMenu: {
    overflowY: 'auto',
    height: 'calc(100vh - 88px)',
    width: 240
  },
  schedule: { maxWidth: 'calc(100vw - 240px)' }
})

export default () => {
  const classes = useStyles()

  const professionals = require('../client/schedule/mockData').professionals
  const [ selectedProfessionalsIds, setSelected ] = useState<ObjectId[]>([
    professionals[0]._id
  ])

  return (
    <Grid container className={classes.pageContainer}>
      <Grid item className={classes.scheduleMenu}>
        <ScheduleMenu {...{ professionals, setSelected, selectedProfessionals: selectedProfessionalsIds }}/>
      </Grid>

      <Grid item xs container className={classes.schedule}>
        <Schedule {...{ professionals, selectedProfessionalsIds, selectedDate: moment() }}/>
      </Grid>
    </Grid>
  )
}