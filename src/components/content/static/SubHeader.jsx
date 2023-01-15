import React from 'react'
import { Link } from 'react-router-dom'

function SubHeader() {
  return (
    <div className='sub-header'>
      <div className="menu-area">
        <ul className='nav-menu'>
          <li className="nav-link"><Link to="/equipment"><span className="link-name"><i className="fa-solid fa-dharmachakra"></i> Equipements</span></Link></li>
          <li className="nav-link"><Link to="/task"><span className="link-name"><i className="fa-solid fa-calendar-check"></i> Tâches</span></Link></li>
          <li className="nav-link"><Link to="/technician"><span className="link-name"><i className="fa-solid fa-users"></i> Techniciens</span></Link></li>
          <li className="nav-link"><Link to="/activity"><span className="link-name"><i className="fa-solid fa-screwdriver-wrench"></i> Activités</span></Link></li>
        </ul>
      </div>
    </div>
  )
}

export default SubHeader
