import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import Container from '@material-ui/core/Container'
import React from 'react'
import { Professional } from '../../common/entityTypes'
import { ObjectId } from 'bson'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles({
  scheduleMenu: {
    overflowY: 'auto',
    height: 'calc(100vh - 88px)',
    width: 240
  }
})

interface Props {
  professionals: Professional[],
  selectedProfessionals: ObjectId[],
  setSelected: React.Dispatch<React.SetStateAction<ObjectId[]>>
}

const ScheduleMenu: React.FC<Props> = ({ professionals, selectedProfessionals, setSelected }) => {
  const classes = useStyles()

  return (
    <Grid item className={classes.scheduleMenu}>
      <Container>
        <List id="professionals-list" component="nav">
          {professionals.map((p) => {
            const selectedIndex = selectedProfessionals.indexOf(p._id)
            const isSelected = selectedIndex !== -1

            return (
              <ListItem
                key={p._id.toHexString()}
                dense
                button
                onClick={() => {
                  setSelected(prevState => {
                    const newSelectedProfessionals = [...prevState]
                    isSelected
                      ? newSelectedProfessionals.splice(selectedIndex, 1)
                      : newSelectedProfessionals.push(p._id)
                    return newSelectedProfessionals
                  })
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="end"
                    checked={isSelected}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>
                <ListItemText primary={`${p.firstName} ${p.lastName}`}/>
              </ListItem>
            )
          })}
        </List>
      </Container>
    </Grid>
  )
}
export default ScheduleMenu