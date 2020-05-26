import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  emptyGapText: {
    color: theme.palette.primary.light
  },
  dynamicGapButton: {
    '& div': {
      display: 'none'
    },
    '&:hover div': {
      display: 'block',
    }
  }
}))

interface Props {
  timeText: string
  showTimeInEmptyGaps: boolean
}

const EmptyGapButton: React.FC<Props> = ({ timeText, showTimeInEmptyGaps }) => {
  const classes = useStyles()

  return (
    <ListItem button className={ showTimeInEmptyGaps ? classes.dynamicGapButton : '' } >
      <ListItemText
        primary={timeText}
        primaryTypographyProps={{ align: 'center', color: 'primary', variant: 'overline' }}
      />
    </ListItem>
  )
}

export default EmptyGapButton