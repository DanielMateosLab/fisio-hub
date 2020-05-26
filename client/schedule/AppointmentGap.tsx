import { Moment } from 'moment'
import EmptyGapButton from './EmptyGapButton'
import React from 'react'

interface Props {
  date: Moment
  showTimeInEmptyGaps: boolean
}

const AppointmentGap: React.FC<Props> = ({ date, showTimeInEmptyGaps}) => {

  // If professsional.appointments.filter(date?) return Card

  return (
    <EmptyGapButton timeText={date.format("HH:mm")} showTimeInEmptyGaps={showTimeInEmptyGaps}/>
  )
}

export default AppointmentGap