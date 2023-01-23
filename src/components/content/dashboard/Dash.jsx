import './dash.css'
import { Link } from 'react-router-dom'
import HeaderContent from '../static/HeaderContent'
import { useEffect, useState } from 'react'
import axios from 'axios'

// Progress Area 
const progress_size = document.querySelectorAll('.progress-section .progress-size')
progress_size.forEach((size)=>{
  const sizeWidth = size.dataset.width
  size.style.width = sizeWidth+"%"
})

function Dash() {
  const [equipements,setEquipements] = useState([])
  const [tasks,setTasks] = useState([])
  const [activities,setActivities] = useState([])
  const [techniciens,setTechniciens] = useState([])

  // main path php
  const mainPath = (page, id, action) => {
    if (page && id && action) {
      return "http://localhost/gmao-react/backend/tables/" +page +"/" +id +"/" +action
    }else if (page && id) {
      return "http://localhost/gmao-react/backend/tables/" + page + "/" + id;
    }else {
      return "http://localhost/gmao-react/backend/tables/" + page;
    }
  };

  // Fetch all data from tables
  const allData = () => {
    axios.get(mainPath("equipement.php")).then(res => setEquipements(res.data));
    axios.get(mainPath("task.php")).then(res=>setTasks(res.data))
    axios.get(mainPath("activity.php")).then(res=>setActivities(res.data))
    axios.get(mainPath("technicien.php")).then(res=>setTechniciens(res.data))
  };

  useEffect(()=>{
    allData();
  },[])

  return (
    <div className='dashboard-section'>
      <HeaderContent title = "Dashboard"/>

      <div className="quick-res">
        <div className="quick-box">
          <div className="icon"><i className="fa-solid fa-dharmachakra"></i></div>
          <span className="counter">{equipements.length}</span>
          <span className="quick-title"><Link to="/equipment">Total d'équipements</Link></span>
        </div>
        <div className="quick-box">
          <div className="icon"><i className="fa-solid fa-calendar-check"></i></div>
          <span className="counter">{tasks.length}</span>
          <span className="quick-title"><Link to="/task">Total des tâches</Link></span>
        </div>
        <div className="quick-box">
          <div className="icon"><i className="fa-solid fa-screwdriver-wrench"></i></div>
          <span className="counter">{activities.length}</span>
          <span className="quick-title"><Link to="/activity">Total d'activités</Link></span>
        </div>
      </div>

      <div className="latest-section">
        <div className="latest">
          <div className="box-content">
            <div className="box-header"><h3>5 dernières tâches</h3><span><Link to="/technician">View more</Link></span></div>
            <div className="box-body">
              <ul>
                {
                tasks.map(task=>{
                  return (
                    <li key={task.id}><Link to ={"task-details/"+task.id}>{task.description}</Link></li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        </div>
        <div className="latest">
          <div className="box-content">
            <div className="box-header"><h3>5 dernières techniciens</h3><span><Link to="/technician">View more</Link></span></div>
            <div className="box-body">
              <div className="circles">
              {
                techniciens.map(tech=>{
                  return (
                    <Link to ={"tech-details/"+tech.id} key={tech.id}>
                      <div className="circle">
                        <span className="circle-logo">
                          <img src={"https://app.mobility-work.com/media/cache/resolve/large/img/profile.JPG"}/>
                        </span>
                        <h3 className="circle-title">{tech.nom}</h3>
                      </div>
                    </Link>
                  )
                })
              }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="progress-section">
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
      </div> */}
    </div>
  )
}

export default Dash
