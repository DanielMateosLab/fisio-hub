import React, { useEffect, useState } from 'react'
import { Professional } from '../../common/entityTypes'
import { ObjectId } from 'bson'
import moment, { Moment } from 'moment'
import ScrollButtons from './ScrollButtons'
import { itemHeight, itemWidth } from './cssValues'
import TimeLine from './TimeLine'
import TimeColumn from './TimeColumn'
import AppointmentsColumns from './AppointmentsColumns'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'


const useStyles = makeStyles({
  main: {
    height: 'calc(100vh - 88px)',
    overflowY: 'auto'
  }
})

interface Props {
  professionals: Professional[]
  selectedProfessionalsIds: ObjectId[]
  selectedDate: Moment
}

const ScheduleMain: React.FC<Props> = ({ professionals, selectedProfessionalsIds, selectedDate }) => {
  const classes = useStyles()

  const selectedProfessionals = selectedProfessionalsIds
    .map(_id => professionals.find(p => p._id === _id))

  // The initial state is a false value that prevents the arrows to be flash-displayed on mount
  const [ contentClientWidth, setContentClientWidth ] = useState(selectedProfessionals.length * itemWidth + 1)

  const contentMainContainer = React.createRef<HTMLDivElement>()
  const contentColumnsContainer = React.createRef<HTMLDivElement>()

  function scrollOneColumn(direction: 'left' | 'right') {
    if (!contentColumnsContainer.current) return

    const { current } = contentColumnsContainer
    const { scrollLeft } = contentColumnsContainer.current

    const scrollRemainder = scrollLeft % itemWidth

    // If a column is just a bit scrolled, scroll is completed; otherwise, an additional column is scrolled
    const scrollAmendment = scrollRemainder < itemWidth / 2 ? -scrollRemainder : itemWidth - scrollRemainder

    const scrollChange = scrollAmendment + (direction === 'left' ? -itemWidth : itemWidth)

    current.scrollTo({ left: scrollLeft + scrollChange })
  }

  useEffect(() => {
    // Set initial client width, needed for correct arrows display
    contentColumnsContainer.current && setContentClientWidth(contentColumnsContainer.current.clientWidth)
  }, [])

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

  const [ scrollTop, setScrollTop ] = useState(0)

  const showLeftHeaderTimeCaptions = selectedProfessionals.length <= 1

  return (
    <Grid
      item
      xs
      className={classes.main}
      container
      ref={contentMainContainer}
      onScrollCapture={event => setScrollTop(event.currentTarget.scrollTop)}
    >
      <TimeLine {...{time, timeLinePosition}} />

      <TimeColumn {...{ gapCount, getGapTime, showLeftHeaderTimeCaptions }} />

      <AppointmentsColumns {...{
        contentColumnsContainer,
        selectedProfessionals,
        gapCount,
        getGapDate,
        showLeftHeaderTimeCaptions,
        scrollTop
      }}/>

      { selectedProfessionals.length * itemWidth > contentClientWidth &&
        <ScrollButtons
          scrollOneColumn={scrollOneColumn}
        />
      }
    </Grid>
  )
}

export default ScheduleMain