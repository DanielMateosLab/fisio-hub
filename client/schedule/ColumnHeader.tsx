import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import React, { useEffect } from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { borderStyle, darkBorderStyle, headerHeight, itemWidth } from './cssValues'
import { Professional } from '../../common/entityTypes'
import { gsap } from 'gsap'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/rootReducer'

const useStyles = makeStyles({
  headerGap: {
    borderBottom: darkBorderStyle,
    height: headerHeight,
    minWidth: itemWidth,
    flex: '1 1 auto',
    borderLeft: borderStyle,
    marginLeft: -1,
    position: 'relative',
    backgroundColor: 'white',
    zIndex: 3
  }
})

interface Props {
  professional: Professional
}

const ColumnHeader: React.FC<Props> = props => {
  const classes = useStyles()

  const scrollTop = useSelector((state: RootState) => state.schedule.scrollTop)

  const headerGap = React.createRef<HTMLDivElement>()

  useEffect(() => {
    gsap.to(headerGap.current, { translateY: -scrollTop, duration: 0.25 })
    setTimeout(() => {
      headerGap.current && gsap.to(headerGap.current, { translateY: scrollTop, duration: 0.25 })
    }, 5)
  }, [scrollTop])

  return (
    <Grid
      item
      container
      alignItems="center"
      justify="center"
      className={classes.headerGap}
      key={`headerItem.${props.professional._id}`}
      ref={headerGap}
    >
      <Typography>
        {`${props.professional.firstName} ${props.professional.lastName}`}
      </Typography>
    </Grid>
  )
}

export default ColumnHeader