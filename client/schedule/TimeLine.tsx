import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { Moment } from 'moment'

const useStyles = makeStyles(theme => ({
  actualTimeLine: {
    width: '100%',
    border: `solid 1px ${theme.palette.secondary.main}`,
    position: 'relative',
    marginTop: -2,
    marginLeft: 24,
    top: (timeLinePosition: number) => timeLinePosition,
    zIndex: 3,
    opacity: 0.5
  },
  TimeLineCaption: {
    position: 'relative',
    marginRight: -42,
    width: 42,
    height: '1.12rem',
    top: (timeLinePosition: number) => timeLinePosition - 10,
    color: 'white',
    background: theme.palette.secondary.main,
    borderRadius: 8,
    zIndex: 4,
  }
}))

interface Props {
  timeLinePosition: number
  time: Moment
}

const TimeLine: React.FC<Props> = ({ timeLinePosition, time}) => {
  const classes = useStyles(timeLinePosition)

  return (
    <>
      <div className={classes.actualTimeLine} />
      <Typography
        variant="caption"
        align="center"
        className={classes.TimeLineCaption}
      > { time.format('HH:mm') } </Typography>
    </>
  )
}

export default TimeLine