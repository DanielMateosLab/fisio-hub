import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { Professional } from '../../common/entityTypes'
import makeStyles from '@material-ui/core/styles/makeStyles'
import teal from '@material-ui/core/colors/teal'
import { borderStyle, itemWidth, leftHeaderWidth } from './cssValues'

const headerHeight = 48
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
  headerTimeDecoration: {
    borderBottom: darkBorderStyle
  },
  whiteShadow: {
    zIndex: 2,
    boxShadow: '-2px 8px 6px -2px white'
  }
})

interface Props {
  selectedProfessionals: Array<Professional | undefined>
  headerColumnsContainer: React.RefObject<HTMLDivElement>
}

const ScheduleHeader: React.FC<Props> = ({ headerColumnsContainer, selectedProfessionals }) => {
  const classes = useStyles()

  return (
    <Grid item container className={classes.topHeader}>
      <Grid item container style={{ width: leftHeaderWidth }}>
        <Grid item xs={9} className={classes.whiteShadow}/>
        <Grid item xs={3} className={classes.headerTimeDecoration}/>
      </Grid>

      <Grid
        item
        xs
        container
        wrap="nowrap"
        className={classes.topHeaderColumns}
        ref={headerColumnsContainer}
      >
        { selectedProfessionals.map(professional => professional && (
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
        { !selectedProfessionals.length &&
        <Grid item container alignItems="center" justify="center" className={classes.topHeaderText}/>
        }
      </Grid>

      {/* Avoids top header to be scrolled more than content due to the scrollbar width */}
      <div style={{ width: 16 }}/>
    </Grid>
  )
}

export default ScheduleHeader