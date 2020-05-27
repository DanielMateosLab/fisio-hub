import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import React, { ReactNode, useEffect } from 'react'
import { gapHeight } from '../../pages/schedule'
import ScheduleMainHeader, { ScheduleHeaderProps } from './ScheduleMainHeader'
import makeStyles from '@material-ui/core/styles/makeStyles'
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
    zIndex: 3,
  }
}))

type ScheduleMainProps = ScheduleHeaderProps & {
  gaps: ReactNode[]
  hourGaps: ReactNode[]
  timeLinePosition: number
  time: Moment
}

const ScheduleMain: React.FC<ScheduleMainProps> = ({ classes, selectedProfessionals, gaps, hourGaps, timeLinePosition, time }) => {
  const timeLineClasses = useStyles(timeLinePosition)
  const container = React.createRef<HTMLDivElement>()

  useEffect(() => {
    container.current?.scrollTo({top: timeLinePosition - gapHeight * 2})
  }, [])

  return (
    <>
      <ScheduleMainHeader {...{ classes, selectedProfessionals }} />

      <Grid id="content" ref={container} item container style={{ overflowY: 'scroll', overflowX: 'hidden', height: 'calc(100vh - 128px)' }}>

        <div id="actualTimeLine" className={timeLineClasses.actualTimeLine} />
        <Typography variant="caption" align="center" className={timeLineClasses.TimeLineCaption} > { time.format('HH:mm') } </Typography>

        <Grid className={classes.timeColumn}>
          {hourGaps}
        </Grid>

        { selectedProfessionals.map(({ name}) => (
          <Grid
            className={classes.appointmentsColumn}
            key={`column.${name}`}
            item
            container
            direction="column"
            xs
          >
            { gaps }
          </Grid>
        ))}

      </Grid>
    </>
  )
}

export default ScheduleMain