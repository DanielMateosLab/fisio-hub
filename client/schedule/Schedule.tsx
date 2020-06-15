import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import React, { useEffect, useState } from 'react'
import { Professional } from '../../common/entityTypes'
import { ObjectId } from 'bson'
import moment, { Moment } from 'moment'
import TimeLine from './TimeLine'
import ScheduleHeader from './ScheduleHeader'
import ScrollButtons from './ScrollButtons'
import { itemHeight, itemWidth } from './cssValues'
import TimeColumn from './TimeColumn'
import AppointmentsColumns from './AppointmentsColumns'

const useStyles = makeStyles({
  main: {
    height: 'calc(100vh - 136px)',
    overflowY: 'auto'
  }
})

interface Props {
  professionals: Professional[]
  selectedProfessionalsIds: ObjectId[]
  selectedDate: Moment
}

const Schedule: React.FC<Props> = props => {
  const classes = useStyles()

  const gapMinutes = 60
  const gapCount = 24 * 60 / gapMinutes

  function getGapDate(i: number) {
    const gapDate = props.selectedDate.clone()
    gapDate.hour(Math.trunc(i * gapMinutes / 60 ))
    gapDate.minute(i * gapMinutes % 60)
    return gapDate
  }

  const getGapTime = (i: number) => getGapDate(i).format('HH:mm')

  const getSelectedProfessionals = () => props.selectedProfessionalsIds
    .map(_id => props.professionals.find(p => p._id === _id))

  const [ scrollX, setScrollX ] = useState(0)
  // The initial state is a false value that prevents the arrows to be flash-displayed on mount
  const [ contentClientWidth, setContentClientWidth ] = useState(getSelectedProfessionals().length * itemWidth + 1)

  const headerColumnsContainer = React.createRef<HTMLDivElement>()
  const contentMainContainer = React.createRef<HTMLDivElement>()
  const contentColumnsContainer = React.createRef<HTMLDivElement>()

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    const scrolledElement = event.currentTarget
    const { scrollLeft } = scrolledElement

    setScrollX(scrollLeft)
    setContentClientWidth(event.currentTarget.clientWidth)

    headerColumnsContainer.current && headerColumnsContainer.current.scrollTo({ left: scrollLeft })
  }

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

  const [ time, setTime ] = useState(moment())
  useEffect(() => {
    const actualTime = moment()
    setTimeout(() => {
      actualTime.add(1, 'minute')
      setTime(actualTime)
    }, 60000 - actualTime.seconds() * 1000)
  }, [ time ])

  const timeLinePosition = time.hour() * (60 / gapMinutes) * itemHeight + time.minute() * ( itemHeight / gapMinutes )

  useEffect(() => {
    contentMainContainer.current && contentMainContainer.current.scrollTo({ top: timeLinePosition - itemHeight * 2 })

    // Set initial client width, needed for correct arrows display
    contentColumnsContainer.current && setContentClientWidth(contentColumnsContainer.current.clientWidth)
  }, [])

  const showLeftHeaderTimeCaptions = getSelectedProfessionals().length <= 1

  return (
    <>
      <ScheduleHeader
        selectedProfessionals={getSelectedProfessionals()}
        headerColumnsContainer={headerColumnsContainer}
      />

      <Grid id="ScheduleBody" item className={classes.main} container ref={contentMainContainer}>
        <TimeLine {...{time, timeLinePosition}} />

        <TimeColumn {...{ gapCount, getGapTime, showLeftHeaderTimeCaptions }} />

        <AppointmentsColumns {...{
          contentColumnsContainer,
          handleScroll,
          selectedProfessionals: getSelectedProfessionals(),
          gapCount,
          getGapDate,
          showLeftHeaderTimeCaptions
        }}/>
      </Grid>

      { getSelectedProfessionals().length * itemWidth > contentClientWidth &&
        <ScrollButtons
          scrollOneColumn={scrollOneColumn}
          isLeftArrowDisabled={scrollX == 0}
          isRightArrowDisabled={scrollX + contentClientWidth == getSelectedProfessionals().length * itemWidth}
        />
      }
    </>
  )
}

export default Schedule