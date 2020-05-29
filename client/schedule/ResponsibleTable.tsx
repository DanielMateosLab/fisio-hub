import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import teal from '@material-ui/core/colors/teal'
import React, { ReactNode } from 'react'
import { Professional } from '../../common/entityTypes'
import { ObjectId } from 'bson'
import { Moment } from 'moment'
import Typography from '@material-ui/core/Typography'

const headerHeight = 48
const itemHeight = 72
const itemWidth = 340
const borderStyle = `solid 1px ${teal['100']}`

const useStyles = makeStyles({
  topHeader: {
    height: headerHeight
  },
  topHeaderColumns: {
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  topHeaderText: {
    borderBottom: borderStyle,
    borderLeft: borderStyle,
    width: itemWidth,
    flex: '0 0 auto'
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
    borderLeft: borderStyle
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
    borderRight: borderStyle,
    flex: '0 0 auto',
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

  return (
    <>
      <Grid item xs={12} container className={classes.topHeader}>
        <Grid item container className={classes.leftHeader}>
          <Grid item xs={9}/>
          <Grid item xs={3} style={{ borderBottom: `solid 1px ${teal['100']}` }}/>
        </Grid>

        <Grid item xs container wrap="nowrap" className={classes.topHeaderColumns}>
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

        <Grid item xs container wrap="nowrap" className={classes.columnContainer}>
          {
            getSelectedProfessionals().map(professional => professional && (
              <div key={`column.${professional._id}`} className={classes.column}>

              </div>
            ))
          }
        </Grid>
      </Grid>
    </>
  )
}

export default ResponsibleTable