import Button from '@material-ui/core/Button'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  scrollButtons: {
    position: 'absolute',
    bottom: 24,
    right: 0,
    zIndex: 3,
    '& button': {
      marginRight: 24,
      padding: 0,
      minWidth: 0,
      borderRadius: '50%'
    }
  }
})

interface Props {
  scrollOneColumn: (direction: 'left' | 'right') => void
  isLeftArrowDisabled: boolean
  isRightArrowDisabled: boolean
}

const ScrollButtons: React.FC<Props> = props => {
  const classes = useStyles()

  return (
    <div className={classes.scrollButtons}>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => props.scrollOneColumn('left')}
        disabled={props.isLeftArrowDisabled}
      >
        <ChevronLeft fontSize="large"/>
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => props.scrollOneColumn('right')}
        disabled={props.isRightArrowDisabled}
      >
        <ChevronRight fontSize="large"/>
      </Button>
    </div>
  )
}

export default ScrollButtons