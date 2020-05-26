import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import React from 'react'
import { ProfessionalsData } from '../../pages/schedule'

interface Props {
  professionals: ProfessionalsData[],
  selectedProfessionals: ProfessionalsData[],
  changeProfessionals: React.Dispatch<React.SetStateAction<ProfessionalsData[]>>
}

const ScheduleMenu: React.FC<Props> = ({ professionals, selectedProfessionals, changeProfessionals }) => {
  return (
    <Container>
      <List id="professionals-list" component="nav">
        {professionals.map((p, i) => (
          <ListItem
            key={p.name}
            dense
            button
            onClick={() => {
              changeProfessionals((prevState => prevState.map((p, ix) => {
                if (selectedProfessionals.length == 7 && !p.selected) return p
                return i === ix
                  ? { name: p.name, selected: !p.selected }
                  : p
              })))
            }}
          >
            <ListItemIcon>
              <Checkbox
                edge="end"
                checked={p.selected}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText primary={p.name}/>
          </ListItem>
        ))}
      </List>
      {selectedProfessionals.length == 7 && (
        <Typography color="secondary" variant="subtitle2"> Puedes seleccionar 7 trabajadores como máximo </Typography>
      )}
    </Container>
  )
}
export default ScheduleMenu