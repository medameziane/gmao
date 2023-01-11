import React from 'react'
import { Link } from "react-router-dom"
import './sidebar.css'

const ShowMenu = (e)=>{
  let parentItem = e.target.parentElement
  parentItem.classList.toggle("showMenu")
  e.target.parentElement.parentElement.classList.toggle("showMenu")
}

function Sidebar() {
  return (
    <>
      <div className="logo-area">
        <i className="fa-solid fa-g"></i> <h1>_ecom</h1>
      </div>
      
      <div className="menu-area">
        <ul className='nav-menu'>
        
          <li className="nav-link">
            <Link to="/"><span className="link-name"> <i className="fa-solid fa-house"></i> Dashboard</span></Link>
          </li>

          <li className="nav-link"><Link to="/equipment"><span className="link-name"><i className="fa-solid fa-dharmachakra"></i> Equipements</span></Link></li>
          <li className="nav-link"><Link to="/task"><span className="link-name"><i className="fa-solid fa-calendar-check"></i> Tâches</span></Link></li>
          <li className="nav-link"><Link to="/technician"><span className="link-name"><i className="fa-solid fa-users"></i> Techniciens</span></Link></li>
          <li className="nav-link"><Link to="/activity"><span className="link-name"><i className="fa-solid fa-screwdriver-wrench"></i> Activités</span></Link></li>
          
          {/* <li className="nav-link" onClick={ShowMenu}><Link to="#"><span className="link-name"><i className="fa-solid fa-user"></i>Users</span> <i className="fa-solid fa-chevron-right arrow"></i></Link>
            <ul className="drop-menu">
              <li className="drop-link"><Link to="/users"><i className="fa-solid fa-users"></i> List Users</Link></li>
              <li className="drop-link"><Link to="/add-user"><i className="fa-solid fa-user-plus"></i> Add User</Link></li>
              <li className="drop-link"><Link to="/users-analitycs"><i className="fa-solid fa-chart-simple"></i> Users Analytics</Link></li>
            </ul>
          </li>

          <li className="nav-link" onClick={ShowMenu}><Link to="#"><span className="link-name"><i className="fa-solid fa-store"></i> Products</span> <i className="fa-solid fa-chevron-right arrow"></i></Link>  
            <ul className="drop-menu">
              <li className="drop-link"><Link to="/products"><i className="fa-solid fa-bars-staggered"></i>List Products</Link></li>
              <li className="drop-link"><Link to="/add-product"><i className="fa-sharp fa-solid fa-cart-plus"></i> Add Product</Link></li>
              <li className="drop-link"><Link to="/products-analitycs"><i className="fa-solid fa-chart-simple"></i> Products Analytics</Link></li>
            </ul>
          </li>

          <li className="nav-link" onClick={ShowMenu}><Link to="#"><span className="link-name"><i className="fa-solid fa-calendar-check"></i> Tasks</span> <i className="fa-solid fa-chevron-right arrow"></i></Link>  
            <ul className="drop-menu">
              <li className="drop-link">
                <Link to="/products"><i className="fa-solid fa-list-check"></i>List Tasks</Link>
              </li>
            </ul>
          </li> */}

        </ul>
      </div>
    </>
  )
}

export default Sidebar
