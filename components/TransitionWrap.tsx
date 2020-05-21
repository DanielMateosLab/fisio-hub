import React from 'react'

const TransitionWrap: React.FC = (props) => (
  <div {...props}>
    { props.children }
  </div>
)

export default TransitionWrap