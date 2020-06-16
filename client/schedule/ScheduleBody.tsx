import TimeLine from './TimeLine'
import TimeColumn from './TimeColumn'
import AppointmentsColumns from './AppointmentsColumns'
import Grid from '@material-ui/core/Grid'
import React, { useEffect, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Professional } from '../../common/entityTypes'
import moment, { Moment } from 'moment'
import { itemHeight } from './cssValues'

const useStyles = makeStyles({
  main: {
    height: 'calc(100vh - 136px)',
    overflowY: 'auto'
  }
})

interface Props {
  selectedDate: Moment
  selectedProfessionals: Array<Professional | undefined>
  contentColumnsContainer: React.RefObject<HTMLDivElement>
  contentMainContainer: React.RefObject<HTMLDivElement>
  handleScroll: (event: any) => void
}

const ScheduleBody: React.FC<Props> = ({
  contentColumnsContainer,
  handleScroll,
  selectedProfessionals,
  contentMainContainer,
  selectedDate
}) => {
  const classes = useStyles()

  const gapMinutes = 60
  const gapCount = 24 * 60 / gapMinutes

  function getGapDate(i: number) {
    const gapDate = selectedDate.clone()
    gapDate.hour(Math.trunc(i * gapMinutes / 60 ))
    gapDate.minute(i * gapMinutes % 60)
    return gapDate
  }

  const getGapTime = (i: number) => getGapDate(i).format('HH:mm')


  const [ time, setTime ] = useState(moment())

  useEffect(() => {
    const actualTime = moment()
    setTimeout(() => {
      actualTime.add(1, 'minute')
      setTime(actualTime)
    }, 60000 - actualTime.seconds() * 1000)
  }, [ time ])

  const timeLinePosition = time.hour() * (60 / gapMinutes) * itemHeight + time.minute() * ( itemHeight / gapMinutes )

  // Scroll to actual time on component mount
  useEffect(() => {
    contentMainContainer.current && contentMainContainer.current.scrollTo({ top: timeLinePosition - itemHeight * 2 })
  }, [])


  const showLeftHeaderTimeCaptions = selectedProfessionals.length <= 1

  return (
    <Grid item className={classes.main} container ref={contentMainContainer}>
      <TimeLine {...{time, timeLinePosition}} />

      <TimeColumn {...{ gapCount, getGapTime, showLeftHeaderTimeCaptions }} />

      <AppointmentsColumns {...{
        contentColumnsContainer,
        handleScroll,
        selectedProfessionals,
        gapCount,
        getGapDate,
        showLeftHeaderTimeCaptions
      }}/>
    </Grid>
  )
}

export default ScheduleBody