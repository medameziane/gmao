import './activity.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderContent from "../static/HeaderContent";

const addActivity = ()=>{
  document.querySelector(".activity-section .add-form").classList.add("showActivityForm")
  document.querySelector(".overly").style.display = "block"
}


function Activity() {
  const [activities,setActivities]=useState([])
  const [etat,setEtat]=useState([])
  const [activityData,setActivityData]=useState({})


  // Fetch all data from activities table
  const getActivities = () => {
    axios.get("http://localhost/gmao-react/backend/getdata.php?table=activite").then((response) =>
    setActivities(response.data)
    )
  }  

  console.log(activities)
  useEffect(()=>{
    getActivities();
  },[]);

  return (
    <div className="activity-section">
      <HeaderContent title = "liste des tâches"/>
      <div className="activity-content">
        <div className="box-content">
          <div className="box-header">
            <div className="btn-action" onClick={addActivity}>Créer activité</div>
          </div>
          <div className="box-body">
            <ul className="list-activities">
              <h1>Activities</h1>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity