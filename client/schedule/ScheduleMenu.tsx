import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import Container from '@material-ui/core/Container'
import React from 'react'
import { Professional } from '../../common/entityTypes'
import { ObjectId } from 'bson'

interface Props {
  professionals: Professional[],
  selectedProfessionals: ObjectId[],
  setSelected: React.Dispatch<React.SetStateAction<ObjectId[]>>
}

const ScheduleMenu: React.FC<Props> = ({ professionals, selectedProfessionals, setSelected }) => {
  return (
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
  )
}
export default ScheduleMenu