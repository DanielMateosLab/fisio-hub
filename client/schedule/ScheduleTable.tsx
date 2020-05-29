import { Professional } from '../../common/entityTypes'
import { ObjectId } from 'bson'
import { ReactNode } from 'react'
import { Moment } from 'moment'
import makeStyles from '@material-ui/core/styles/makeStyles'
import teal from '@material-ui/core/colors/teal'

const useStyles = makeStyles(theme => ({
  root: {
    borderCollapse: 'collapse',
    tableLayout: 'fixed',
    overflow: 'auto',
    width: '100%',
    '& td, th': {
      border: `solid 1px ${teal['100']}`,
      padding: 8
    },
    '& td': {
      minWidth: 400
    }
  }
}))

interface Props {
  professionals: Professional[]
  selectedProfessionals: ObjectId[]
  selectedDate: Moment
}

const ScheduleTable: React.FC<Props> = props => {
  const gapMinutes = 60
  const gapCount = 24 * 60 / gapMinutes

  function getGapDate(i: number) {
    const gapDate = props.selectedDate.clone()
    gapDate.hour(Math.trunc(i * gapMinutes / 60 ))
    gapDate.minute(i * gapMinutes % 60)
    return gapDate
  }

  const getGapTime = (i: number) => getGapDate(i).format('HH:mm')

  const classes = useStyles()
  
  return (
    <table className={classes.root}>
      <thead>
        <tr>
          <th />
          { props.selectedProfessionals.map(_id => {
            const professional = props.professionals.find(p => p._id === _id)
            return professional && <th> {`${professional.firstName} ${professional.lastName}`} </th>
          }) }
        </tr>
      </thead>
      <tbody>
        { (() => {
          let tableRows: ReactNode[] = []

          for (let i = 0; i < gapCount; i++) {
            tableRows.push((
              <tr>
                <th> { getGapTime(i) } </th>
                { props.selectedProfessionals.map(() => <td> { getGapTime(i) } </td>) }
              </tr>
            ))
          }

          return tableRows
        })() }
      </tbody>
    </table>
  )
}

export default ScheduleTable