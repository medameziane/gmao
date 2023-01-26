import React from 'react'

function SuccessAction(props) {
  return (
    <div className='success-action'>
      <div className="card-success"><h2>{props.action} avec succès</h2></div>
    </div>
  )
}

export default SuccessAction
