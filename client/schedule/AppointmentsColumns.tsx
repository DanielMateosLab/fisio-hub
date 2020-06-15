import React from 'react'
import Grid from '@material-ui/core/Grid'
import AppointmentCard from './AppointmentCard'
import { mockAppointment } from '../../__test__/testUtils'
import EmptyGapButton from './EmptyGapButton'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { borderStyle, itemHeight, itemWidth } from './cssValues'
import teal from '@material-ui/core/colors/teal'
import { Professional } from '../../common/entityTypes'
import { Moment } from 'moment'

const useStyles = makeStyles({
  columnContainer: {
    overflowX: 'auto',
    scrollBehavior: 'smooth',
    marginLeft: -1
  },
  column: {
    minWidth: itemWidth,
    flex: '1 1 auto',
    borderLeft: borderStyle
  },
  gap: {
    height: itemHeight,
    borderBottom: `solid 1px ${teal['100']}`
  }
})

interface Props {
  contentColumnsContainer: React.RefObject<HTMLDivElement>
  handleScroll: (event: any) => void
  selectedProfessionals: Array<Professional | undefined>
  gapCount: number
  getGapDate: (i: number) => Moment
  showLeftHeaderTimeCaptions: boolean
}

const AppointmentsColumns: React.FC<Props> = props => {
  const classes = useStyles()

  return (
    <Grid
      item
      xs
      container
      wrap="nowrap"
      className={classes.columnContainer}
      ref={props.contentColumnsContainer}
      onScrollCapture={props.handleScroll}
    >
      {
        props.selectedProfessionals.map(professional => professional && (
          <div key={`column.${professional._id}`} className={classes.column}>
            {(() => {
              let appointmentGaps: React.ReactNode[] = []
              for (let i = 0; i < props.gapCount; i++) {
                appointmentGaps.push(
                  <Grid item container className={classes.gap} key={`${professional._id}.${i}`}>
                    { i == 20 ? <AppointmentCard appointment={mockAppointment} /> :
                      <EmptyGapButton
                        timeText={props.getGapDate(i).format("HH:mm")}
                        showTimeInEmptyGaps={!props.showLeftHeaderTimeCaptions}
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
      { !props.selectedProfessionals.length && (
        <div className={classes.column}>
          {(() => {
            let appointmentGaps: React.ReactNode[] = []
            for (let i = 0; i < props.gapCount; i++) {
              appointmentGaps.push(
                <Grid item container className={classes.gap} key={`noProfessionalGap.${i}`} />
              )}
            return appointmentGaps
          })()}
        </div>
      ) }
    </Grid>
  )
}

export default AppointmentsColumns