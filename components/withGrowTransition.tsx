import React from 'react'
import Grow from '@material-ui/core/Grow'
import TransitionWrap from './TransitionWrap'


const withGrowTransition = (wrappedComponent: React.ReactNode, inCondition: boolean) => (
  <Grow
    in={inCondition}
    unmountOnExit
    mountOnEnter
    exit={false}
  >
    <TransitionWrap>
      {wrappedComponent}
    </TransitionWrap>
  </Grow>
)

export default withGrowTransition