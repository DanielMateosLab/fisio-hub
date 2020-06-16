import React, { useEffect, useState } from 'react'
import { Professional } from '../../common/entityTypes'
import { ObjectId } from 'bson'
import { Moment } from 'moment'
import ScheduleHeader from './ScheduleHeader'
import ScrollButtons from './ScrollButtons'
import { itemWidth } from './cssValues'
import ScheduleBody from './ScheduleBody'

interface Props {
  professionals: Professional[]
  selectedProfessionalsIds: ObjectId[]
  selectedDate: Moment
}

const Schedule: React.FC<Props> = ({ professionals, selectedProfessionalsIds, selectedDate }) => {

  const selectedProfessionals = selectedProfessionalsIds
    .map(_id => professionals.find(p => p._id === _id))

  const [ scrollX, setScrollX ] = useState(0)
  // The initial state is a false value that prevents the arrows to be flash-displayed on mount
  const [ contentClientWidth, setContentClientWidth ] = useState(selectedProfessionals.length * itemWidth + 1)

  const headerColumnsContainer = React.createRef<HTMLDivElement>()
  const contentMainContainer = React.createRef<HTMLDivElement>()
  const contentColumnsContainer = React.createRef<HTMLDivElement>()

  function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    const scrolledElement = event.currentTarget
    const { scrollLeft } = scrolledElement

    setScrollX(scrollLeft)
    setContentClientWidth(event.currentTarget.clientWidth)

    headerColumnsContainer.current && headerColumnsContainer.current.scrollTo({ left: scrollLeft })
  }

  function scrollOneColumn(direction: 'left' | 'right') {
    if (!contentColumnsContainer.current) return

    const { current } = contentColumnsContainer
    const { scrollLeft } = contentColumnsContainer.current

    const scrollRemainder = scrollLeft % itemWidth

    // If a column is just a bit scrolled, scroll is completed; otherwise, an additional column is scrolled
    const scrollAmendment = scrollRemainder < itemWidth / 2 ? -scrollRemainder : itemWidth - scrollRemainder

    const scrollChange = scrollAmendment + (direction === 'left' ? -itemWidth : itemWidth)

    current.scrollTo({ left: scrollLeft + scrollChange })
  }

  useEffect(() => {
    // Set initial client width, needed for correct arrows display
    contentColumnsContainer.current && setContentClientWidth(contentColumnsContainer.current.clientWidth)
  }, [])


  return (
    <>
      <ScheduleHeader
        selectedProfessionals={selectedProfessionals}
        headerColumnsContainer={headerColumnsContainer}
      />

      <ScheduleBody {...{
        selectedDate,
        selectedProfessionals,
        contentMainContainer,
        contentColumnsContainer,
        handleScroll
      }} />

      { selectedProfessionals.length * itemWidth > contentClientWidth &&
        <ScrollButtons
          scrollOneColumn={scrollOneColumn}
          isLeftArrowDisabled={scrollX == 0}
          isRightArrowDisabled={scrollX + contentClientWidth == selectedProfessionals.length * itemWidth}
        />
      }
    </>
  )
}

export default Schedule