import { ScheduleClasses } from '../../pages/schedule'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import teal from '@material-ui/core/colors/teal'
import Typography from '@material-ui/core/Typography'
import { Professional } from '../../common/entityTypes'

export interface ScheduleHeaderProps {
  classes: ScheduleClasses,
  selectedProfessionals: Professional[],
}

const ScheduleMainHeader: React.FC<ScheduleHeaderProps> = ({ classes, selectedProfessionals }) => (
  <Grid id="header" item container xs>
    <Grid item container className={classes.timeColumn}>
      <Grid item xs={9} alignItems="flex-end"/>
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

export default ScheduleMainHeader