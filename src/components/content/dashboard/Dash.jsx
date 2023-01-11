import './dash.css'
import { Link } from 'react-router-dom'
import HeaderContent from '../static/HeaderContent'

// Progress Area 
const progress_size = document.querySelectorAll('.progress-section .progress-size')
progress_size.forEach((size)=>{
  const sizeWidth = size.dataset.width
  size.style.width = sizeWidth+"%"
})

function Dash() {
  return (
    <div className='dashboard-section'>
      <HeaderContent title = "Dashboard"/>

      <div className="quick-res">
        <div className="quick-box">
          <div className="icon"><i className="fa-solid fa-users"></i></div>
          <span className="counter">10</span>
          <span className="quick-title"><Link to="/users">Total users</Link></span>
        </div>
      </div>

      <div className="latest-section">
        <div className="latest-users">
          <div className="box-content">
            <div className="box-header"><h3>Latest Title</h3><span><a href="/users">View more</a></span></div>
            <div className="box-body">
              <ul>
                <li><a href="#">Mohammed</a></li>
                <li><a href="#">Ali</a></li>
                <li><a href="#">Oussama</a></li>
                <li><a href="#">Youness</a></li>
                <li><a href="#">Bdr</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <div className="box-content">
          <div className="box-header"><h3>Progress Title</h3><span><a href="/products-analitycs">View more</a></span></div>       
          <div className="box-body">
            <div className='progress-item'>
              <span className="progress-name">Smart Phones (5)</span>
              <div className="progress-content">
                <span className="progress-size" data-width ="50"></span> 
                <span className="progress-counter">50%</span>
              </div>
            </div>
            <div className='progress-item'>
              <span className="progress-name">Home Decoration (2)</span>
              <div className="progress-content">
                <span className="progress-size" data-width ="20"></span> 
                <span className="progress-counter">20%</span>
              </div>
            </div>
            <div className='progress-item'>
              <span className="progress-name">Handmade (7)</span>
              <div className="progress-content">
                <span className="progress-size" data-width ="70"></span> 
                <span className="progress-counter">70%</span>
              </div>
            </div>
            <div className='progress-item'>
              <span className="progress-name">Cars (9)</span>
              <div className="progress-content">
                <span className="progress-size" data-width ="90"></span> 
                <span className="progress-counter">90%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dash
