import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import ScheduleMenu from '../client/schedule/ScheduleMenu'
import moment from 'moment'
import { ObjectId } from 'bson'
import ScheduleMain from '../client/schedule/ScheduleMain'

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
    professionals[0]._id,
    professionals[1]._id,
    professionals[2]._id,
    professionals[3]._id,
    professionals[4]._id,
    professionals[5]._id
  ])

  return (
    <Grid container className={classes.pageContainer}>
      <Grid item className={classes.scheduleMenu}>
        <ScheduleMenu {...{ professionals, setSelected, selectedProfessionals: selectedProfessionalsIds }}/>
      </Grid>

      <Grid item xs container className={classes.schedule}>
        <ScheduleMain {...{ professionals, selectedProfessionalsIds, selectedDate: moment() }}/>
      </Grid>
    </Grid>
  )
}