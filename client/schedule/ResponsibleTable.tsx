import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import teal from '@material-ui/core/colors/teal'
import React, { ReactNode } from 'react'
import { Professional } from '../../common/entityTypes'
import { ObjectId } from 'bson'
import { Moment } from 'moment'
import Typography from '@material-ui/core/Typography'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import Button from '@material-ui/core/Button'

const headerHeight = 48
const itemHeight = 72
const itemWidth = 340
const borderStyle = `solid 1px ${teal['100']}`

const columnBorder = {
  borderLeft: borderStyle,
  marginLeft: -1
}

const useStyles = makeStyles({
  topHeader: {
    height: headerHeight
  },
  topHeaderColumns: {
    overflowX: 'hidden'
  },
  topHeaderText: {
    borderBottom: borderStyle,
    width: itemWidth,
    flex: '0 0 auto',
    ...columnBorder
  },
  main: {
    height: 'calc(100vh - 136px)',
    overflowY: 'auto'
  },
  leftHeader: {
    borderRight: borderStyle,
    width: 48
  },
  columnContainer: {
    overflowX: 'auto',
    scrollBehavior: 'smooth'
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
    width: itemWidth,
    flex: '0 0 auto',
    ...columnBorder
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

  const headerScrollableContainer = React.createRef<HTMLDivElement>()
  const contentScrollableContainer = React.createRef<HTMLDivElement>()

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    const scrolledElement = event.currentTarget
    const { scrollLeft } = scrolledElement

    headerScrollableContainer.current && headerScrollableContainer.current.scrollTo({ left: scrollLeft })
  }

  function scrollOneColumn(direction: 'left' | 'right') {
    if (!contentScrollableContainer.current) return

    const { current } = contentScrollableContainer
    const { scrollLeft } = contentScrollableContainer.current

    const scrollRemainder = scrollLeft % itemWidth

    // If a column is just a bit scrolled, scroll is completed; otherwise, an additional column is scrolled
    const scrollAmendment = scrollRemainder < itemWidth / 2 ? -scrollRemainder : itemWidth - scrollRemainder

    const scrollChange = scrollAmendment + direction === 'left' ? -itemWidth : itemWidth

    current.scrollTo({ left: scrollLeft + scrollChange })
  }

  return (
    <>
      <Grid item xs={12} container className={classes.topHeader}>
        <Grid item container className={classes.leftHeader}>
          <Grid item xs={9}/>
          <Grid item xs={3} style={{ borderBottom: `solid 1px ${teal['100']}` }}/>
        </Grid>

        <Grid
          item
          xs
          container
          wrap="nowrap"
          className={classes.topHeaderColumns}
          ref={headerScrollableContainer}
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
        </Grid>

        {/* Avoids top header to be scrolled more than content due to the scrollbar width */}
        <div style={{ width: 16 }}/>
      </Grid>

      <Grid item className={classes.main} container xs={12}>
        <Grid item className={classes.leftHeader}>
          { (() => {
            let timeItems: ReactNode[] = []

            for (let i = 0; i < gapCount; i++) {
              const timeHeaderValue = getGapTime(i)
              timeItems.push((
                <Grid item xs={12} container key={timeHeaderValue}>
                  <Grid item xs={9}>
                    <Typography className={classes.timeCaption} color="primary" variant="caption">
                      { i > 0 && timeHeaderValue }
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
          ref={contentScrollableContainer}
          onScrollCapture={handleScroll}
        >
          {
            getSelectedProfessionals().map(professional => professional && (
              <div key={`column.${professional._id}`} className={classes.column}>

              </div>
            ))
          }
        </Grid>
      </Grid>

      <div className={classes.scrollButtons}>
        <Button variant="contained" color="secondary" onClick={() => scrollOneColumn('left')}>
          <ChevronLeft fontSize="large"/>
        </Button>
        <Button variant="contained" color="secondary" onClick={() => scrollOneColumn('right')}>
          <ChevronRight fontSize="large"/>
        </Button>
      </div>
    </>
  )
}

export default ResponsibleTable