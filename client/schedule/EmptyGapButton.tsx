import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
  emptyGapText: {
    color: theme.palette.primary.light
  },
  gapButton: {
    width: "100%",
    height: "100%",
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
}

const EmptyGapButton: React.FC<Props> = ({ timeText }) => {
  const classes = useStyles()

  return (
    <ListItem button className={classes.gapButton} >
      <ListItemText
        primary={timeText}
        primaryTypographyProps={{ align: 'center', className: classes.emptyGapText, variant: 'overline' }}
      />
    </ListItem>
  )
}

export default EmptyGapButton