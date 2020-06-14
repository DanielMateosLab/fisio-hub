import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import teal from '@material-ui/core/colors/teal'
import React, { ReactNode, useEffect, useState } from 'react'
import { Professional } from '../../common/entityTypes'
import { ObjectId } from 'bson'
import moment, { Moment } from 'moment'
import Typography from '@material-ui/core/Typography'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import Button from '@material-ui/core/Button'
import TimeLine from './TimeLine'
import AppointmentCard from './AppointmentCard'
import EmptyGapButton from './EmptyGapButton'
import { mockAppointment } from '../../__test__/testUtils'

const headerHeight = 48
const itemHeight = 72
const itemWidth = 340
const borderStyle = `solid 1px ${teal['100']}`
const darkBorderStyle = `solid 1px ${teal['300']}`

const useStyles = makeStyles({
  topHeader: {
    height: headerHeight
  },
  topHeaderColumns: {
    overflowX: 'hidden',
    marginLeft: -1
  },
  topHeaderText: {
    borderBottom: darkBorderStyle,
    minWidth: itemWidth,
    flex: '1 1 auto',
    borderLeft: borderStyle
  },
  main: {
    height: 'calc(100vh - 136px)',
    overflowY: 'auto'
  },
  leftHeader: {
    width: 48
  },
  columnContainer: {
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    marginLeft: -1
  },
  timeCaption: {
    position: 'relative',
    bottom: 12
  },
  timeDecoration: {
    borderBottom: borderStyle,
    height: itemHeight
  },
  column: {
    minWidth: itemWidth,
    flex: '1 1 auto',
    borderLeft: borderStyle
  },
  scrollButtons: {
    position: 'absolute',
    bottom: 24,
    right: 0,
    zIndex: 3,
    '& button': {
      marginRight: 24,
      padding: 0,
      minWidth: 0,
      borderRadius: '50%'
    }
  },
  gap: {
    height: itemHeight,
    borderBottom: `solid 1px ${teal['100']}`
  },
  whiteShadow: {
    zIndex: 2,
    boxShadow: '-8px 8px 8px white'
  }
})

interface Props {
  professionals: Professional[]
  selectedProfessionalsIds: ObjectId[]
  selectedDate: Moment
}

const ResponsibleTable: React.FC<Props> = props => {
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

  const isLeftArrowDisabled = scrollX == 0
  const isRightArrowDisabled = scrollX + contentClientWidth == getSelectedProfessionals().length * itemWidth

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
      <Grid item container className={classes.topHeader}>
        <Grid item container className={`${classes.leftHeader} ${classes.whiteShadow}`}>
          <Grid item xs={9}/>
          <Grid item xs={3} style={{ borderBottom: darkBorderStyle }}/>
        </Grid>

        <Grid
          item
          xs
          container
          wrap="nowrap"
          className={classes.topHeaderColumns}
          ref={headerColumnsContainer}
        >
          { getSelectedProfessionals().map(professional => professional && (
            <Grid
              item
              container
              alignItems="center"
              justify="center"
              className={classes.topHeaderText}
              key={`headerItem.${professional._id}`}
            >
              <Typography>
                {`${professional.firstName} ${professional.lastName}`}
              </Typography>
            </Grid>
          )) }
        {/* Header placeholder */}
          { !getSelectedProfessionals().length &&
            <Grid item container alignItems="center" justify="center" className={classes.topHeaderText}/>
          }
        </Grid>

        {/* Avoids top header to be scrolled more than content due to the scrollbar width */}
        <div style={{ width: 16 }}/>
      </Grid>

      <Grid item className={classes.main} container ref={contentMainContainer}>
        <TimeLine {...{time, timeLinePosition}} />

        <Grid item className={classes.leftHeader}>
          { (() => {
            let timeItems: ReactNode[] = []

            for (let i = 0; i < gapCount; i++) {
              const timeHeaderValue = getGapTime(i)
              timeItems.push((
                <Grid item xs={12} container key={timeHeaderValue}>
                  <Grid item xs={9}>
                    <Typography className={classes.timeCaption} color="primary" variant="caption">
                      { showLeftHeaderTimeCaptions && timeHeaderValue }
                    </Typography>
                  </Grid>
                  <Grid item xs={3} className={classes.timeDecoration}/>
                </Grid>
              ))
            }

            return timeItems
          })() }
        </Grid>

        <Grid
          item
          xs
          container
          wrap="nowrap"
          className={classes.columnContainer}
          ref={contentColumnsContainer}
          onScrollCapture={handleScroll}
        >
          {
            getSelectedProfessionals().map(professional => professional && (
              <div key={`column.${professional._id}`} className={classes.column}>
                {(() => {
                  let appointmentGaps: React.ReactNode[] = []
                  for (let i = 0; i < gapCount; i++) {
                    appointmentGaps.push(
                      <Grid item container className={classes.gap} key={`${professional._id}.${i}`}>
                        { i == 20 ? <AppointmentCard appointment={mockAppointment} /> :
                          <EmptyGapButton
                            timeText={getGapDate(i).format("HH:mm")}
                            showTimeInEmptyGaps={!showLeftHeaderTimeCaptions}
                          />
                        }
                      </Grid>
                    )}
                  return appointmentGaps
                })()}
              </div>
            ))
          }
          {/* Body placeholder */}
          { !getSelectedProfessionals().length && (
            <div className={classes.column}>
              {(() => {
                let appointmentGaps: React.ReactNode[] = []
                for (let i = 0; i < gapCount; i++) {
                  appointmentGaps.push(
                    <Grid item container className={classes.gap} key={`noProfessionalGap.${i}`} />
                  )}
                return appointmentGaps
              })()}
            </div>
          ) }
        </Grid>
      </Grid>

      { getSelectedProfessionals().length * itemWidth > contentClientWidth && <div className={classes.scrollButtons}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => scrollOneColumn('left')}
          disabled={isLeftArrowDisabled}
        >
          <ChevronLeft fontSize="large"/>
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => scrollOneColumn('right')}
          disabled={isRightArrowDisabled}
        >
          <ChevronRight fontSize="large"/>
        </Button>
      </div>}
    </>
  )
}

export default ResponsibleTable