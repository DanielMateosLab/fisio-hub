import Grid from '@material-ui/core/Grid'
import teal from '@material-ui/core/colors/teal'
import Typography from '@material-ui/core/Typography'
import React, { ReactNode } from 'react'
import { ProfessionalsData, ScheduleClasses } from '../../pages/schedule'

interface ScheduleHeaderProps {
  classes: ScheduleClasses,
  selectedProfessionals: ProfessionalsData[],
}

const ScheduleMainHeader: React.FC<ScheduleHeaderProps> = ({ classes, selectedProfessionals }) => (
  <Grid id="header" item container xs>
    <Grid item container className={classes.timeColumn}>
      <Grid item xs={9} container alignItems="flex-end"/>
      <Grid item xs={3} style={{ borderBottom: `solid 1px ${teal['100']}` }}/>
    </Grid>

    { selectedProfessionals.map(({ name }) => (
      <Grid item container direction="column" xs key={`header.${name}`} style={{maxHeight: 40}}>
        <Grid item xs>
          {/* TODO: display only the name, not the lastName */}
          <Typography color="textPrimary" align="center" variant="subtitle2"> {name} </Typography>
        </Grid>
        <Grid item className={classes.headerStyleGap}/>
      </Grid>
    ))}

    {/* Equivalent to the scrollbar width */}
    <div style={{ width: 16 }}/>
  </Grid>
)

type ScheduleMainProps = ScheduleHeaderProps & {
  gaps: ReactNode[]
  hourGaps: ReactNode[],
  timeLinePosition: number
}

const ScheduleMain: React.FC<ScheduleMainProps> = ({ classes, selectedProfessionals, gaps, hourGaps, timeLinePosition }) => {
  return (
    <>
      <ScheduleMainHeader {...{ classes, selectedProfessionals }} />

      <Grid id="content" item container style={{ overflowY: 'scroll', overflowX: 'hidden', height: 'calc(100vh - 128px)' }}>

        <div id="actualTimeLine" className={classes.actualTimeLine} style={{ top: timeLinePosition }} />

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