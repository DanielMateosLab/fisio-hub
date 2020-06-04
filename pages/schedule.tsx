import React, { useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import teal from '@material-ui/core/colors/teal'
import ScheduleMenu from '../client/schedule/ScheduleMenu'
import moment from 'moment'
import { ObjectId } from 'bson'
import ResponsibleTable from '../client/schedule/ResponsibleTable'

export const gapHeight = 96

const useStyles = makeStyles({
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
  }
})

export type ScheduleClasses = ReturnType<typeof useStyles>

export default () => {
  const classes = useStyles()

  const professionals = require('../client/schedule/mockData').professionals
  const [ selectedProfessionalsIds, setSelected ] = useState<ObjectId[]>([
    professionals[0]._id,
    professionals[1]._id,
    professionals[2]._id,
    professionals[3]._id,
    professionals[4]._id
  ])

  // const gapMinutes = 60
  // const gapCount = 24 * 60 / gapMinutes
  //
  // const date = moment()
  //
  // function getGapDate(i: number) {
  //   const gapDate = date.clone()
  //   gapDate.hour(Math.trunc(i * gapMinutes / 60 ))
  //   gapDate.minute(i * gapMinutes % 60)
  //   return gapDate
  // }
  //
  // const getGapTime = (i: number) => getGapDate(i).format('HH:mm')
  //
  // const getTimeLinePosition = (time: Moment) => {
  //   const hoursPosition = time.hour() * (60 / gapMinutes) * gapHeight
  //   const minutesPosition = (time.minute()) * ( gapHeight / gapMinutes )
  //
  //   return hoursPosition + minutesPosition
  // }
  //
  // const [ time, setTime ] = useState(moment())
  // const timeLinePosition = getTimeLinePosition(time)
  //
  // useEffect(() => {
  //   setTimeout(() => {
  //     const actualTime = moment()
  //     actualTime.add(1, 'minute')
  //     setTime(actualTime)
  //   }, 60000)
  // }, [ time ])
  //
  // let gaps: ReactNode[] = []
  // let hourGaps: ReactNode[] = []
  //
  // for (let i = 0; i < gapCount; i++) {
  //   gaps.push(
  //     <Grid item container className={classes.gap} key={i}>
  //       { i == 20 ? <AppointmentCard appointment={mockAppointment} /> :
  //         <EmptyGapButton timeText={date.format("HH:mm")} showTimeInEmptyGaps={selectedProfessionals.length == 1}/>
  //       }
  //     </Grid>
  //   )
  //
  //   hourGaps.push(
  //     <Grid item container key={`timeGap.${i}`}>
  //       <Grid item xs={9}>
  //         { i > 0 && selectedProfessionals.length == 1 &&
  //           <Typography className={classes.timeText} color="primary" variant="caption">
  //             { getGapTime(i) }
  //           </Typography>
  //         }
  //       </Grid>
  //       <Grid item xs={3} className={classes.gap} />
  //     </Grid>
  //   )
  // }

  return (
    <Grid container className={classes.pageContainer}>
      <Grid item style={{ overflowY: 'auto', height: 'calc(100vh - 88px)', width: 240 }}>
        <ScheduleMenu {...{ professionals, setSelected, selectedProfessionals: selectedProfessionalsIds }}/>
      </Grid>

      <Grid item xs container style={{ maxWidth: 'calc(100vw - 240px)'}}>
      < ResponsibleTable {...{ professionals, selectedProfessionalsIds, selectedDate: moment() }}/>
      </Grid>

    </Grid>
  )
}