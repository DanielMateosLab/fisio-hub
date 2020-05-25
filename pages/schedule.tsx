import React, { ReactNode, useState } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import teal from '@material-ui/core/colors/teal'
import ScheduleMenu from '../client/schedule/ScheduleMenu'
import EmptyGapButton from '../client/schedule/EmptyGapButton'

const useStyles = makeStyles(theme => ({
  mainContainer: {
    paddingTop: 24
  },
  gap: {
    height: 72,
    borderBottom: `solid 1px ${teal['100']}`
  },
  headerStyleGap: {
    borderBottom: `solid 1px ${teal['100']}`,
    borderLeft: `solid 1px ${teal['100']}`,
    height: 16
  },
  appointmentsColumn: {
    borderLeft: `solid 1px ${teal['100']}`
  },
  timeColumn: {
    width: 48
  },
  timeText: {
    color: theme.palette.primary.light,
    position: 'relative',
    bottom: 12
  }
}))

export interface ProfessionalsData {
  name: string
  selected: boolean
}

export default () => {
  const classes = useStyles()

  const [ professionals, changeProfessionals ] = useState<ProfessionalsData[]>(
    [
      { name: 'Daniel Mateos', selected: true },
      { name: 'Jorge Calviño', selected: true },
      { name: 'Miriam Rodríguez', selected: false },
      { name: 'Simón Sánchez', selected: false },
      { name: 'Almudena Carrasco', selected: false },
    ]
  )
  const selectedProfessionals = professionals.filter(p => p.selected)

  const gapMinutes = 60

  let gaps: ReactNode[] = []
  let hourGaps: ReactNode[] = []

  for (let i = 0; i < 24; i++) {
    gaps.push(
      <Grid item container className={classes.gap} key={i} tabIndex={-1}>
        <EmptyGapButton timeText={`${ i + 1 }:00`}/>
      </Grid>
    )
    hourGaps.push(
      <Grid item container key={i + ':00'} tabIndex={-1}>
        <Grid item xs={9}>
          { i > 0 &&
            <Typography className={classes.timeText} variant="caption">
              {i.toString().length == 1 ? `0${i}:00` : `${i}:00`}
            </Typography>
          }
        </Grid>
        <Grid item xs={3} className={classes.gap} />
      </Grid>
    )
  }

  return (
    <Grid container className={classes.mainContainer}>
      <Grid item xs={3} style={{ overflowY: 'auto', height: 'calc(100vh - 88px)' }}>
        <ScheduleMenu {...{ professionals, changeProfessionals, selectedProfessionals }}/>
      </Grid>

      <Grid id="appointments" item container direction='column' xs={9}>
        <Grid id="header" item container xs>
          <Grid item container className={classes.timeColumn}>
            <Grid item xs={9} />
            <Grid item xs={3} style={{ borderBottom: `solid 1px ${teal['100']}` }} />
          </Grid>

          { selectedProfessionals.map(({ name }) => (
            <Grid item container direction="column" xs>
              <Grid item xs>
                <Typography color="textPrimary" align="center" > { name } </Typography>
              </Grid>
              <Grid item className={classes.headerStyleGap} />
            </Grid>
          ))}

          {/* Adjust scrollbar width */}
          <div style={{ width: 16 }}/>
        </Grid>

        <Grid id="content" item container style={{ overflowY: 'scroll', height: 'calc(100vh - 128px)' }}>

          <Grid className={classes.timeColumn}>
            { hourGaps }
          </Grid>

          { selectedProfessionals.map(() => (
            <Grid
              className={classes.appointmentsColumn}
              key={name}
              item
              container
              direction="column"
              xs
            >
              { gaps }
            </Grid>
          ))}

        </Grid>
      </Grid>

    </Grid>
  )
}