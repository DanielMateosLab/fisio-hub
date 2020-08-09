import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import ScheduleMenu from '../client/schedule/ScheduleMenu'
import moment from 'moment'
import { ObjectId } from 'bson'
import ScheduleMain from '../client/schedule/ScheduleMain'
import { useSelector } from 'react-redux'
import { RootState } from '../client/redux/rootReducer'
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  pageContainer: { paddingTop: 24 }
})

export default () => {
  const classes = useStyles()

  const { professional } = useSelector((state: RootState) => state.session)
  const router = useRouter()

  useEffect(() => {
    !professional && router.push('/login')
  }, [professional])

  if (!professional) return null


  const professionals = require('../client/schedule/mockData').professionals
  // TODO: change to selectedProfessionals. Handle the related logic in this component
  const [ selectedProfessionalsIds, setSelected ] = useState<ObjectId[]>([
    professionals[0]._id,
    professionals[1]._id
  ])

  return (
    <Grid container className={classes.pageContainer}>
      <ScheduleMenu {...{ professionals, setSelected, selectedProfessionals: selectedProfessionalsIds }}/>

      <ScheduleMain {...{ professionals, selectedProfessionalsIds, selectedDate: moment() }}/>
    </Grid>
  )
}