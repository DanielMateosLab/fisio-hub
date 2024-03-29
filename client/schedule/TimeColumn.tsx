import { borderStyle, darkBorderStyle, headerHeight, itemHeight, leftHeaderWidth } from './cssValues'
import React, { ReactNode } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  timeCaption: {
    position: 'relative',
    bottom: 12
  },
  timeDecoration: {
    borderBottom: borderStyle,
    height: itemHeight
  },
  headerGap: {
    height: headerHeight
  },
  headerTimeDecoration: {
    borderBottom: darkBorderStyle,
  },
  timeColumn: {
    width: leftHeaderWidth,
    borderRight: borderStyle,
    zIndex: 3
  }})

interface Props {
  gapCount: number
  getGapTime: (i: number) => string
  showLeftHeaderTimeCaptions: boolean
}

const TimeColumn: React.FC<Props> = ({ gapCount, getGapTime, showLeftHeaderTimeCaptions }) => {
  const classes = useStyles()

  return (
    <Grid item className={classes.timeColumn}>
      <Grid item container className={classes.headerGap}>
        <Grid item xs={9}/>
        <Grid item xs={3} className={classes.headerTimeDecoration}/>
      </Grid>

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
  )
}

export default TimeColumn