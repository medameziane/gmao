import './activity.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderContent from "../static/HeaderContent";
import SubHeader from "../static/SubHeader";

const addActivity = ()=>{
  document.querySelector(".activity-section .add-form").classList.add("showActivityForm")
  document.querySelector(".overly").style.display = "block"
}

const exitForm = ()=>{
  document.querySelector(".activity-section .add-form").classList.remove("showActivityForm")
  document.querySelector(".overly").style.display = "none"
}

function Activity() {
  const [activities,setActivities]=useState([])
  const [etat,setEtat]=useState([])
  const [activityData,setActivityData]=useState({})


  // Fetch all data from activities table
  const getActivities = () => {
    axios.get("http://localhost/gmao-react/backend/tables/activity.php").then((response) =>
    setActivities(response.data)
    )
  }  

  // Fetch all data from etat table
  const getEtat = () => {
    axios.get("http://localhost/gmao-react/backend/tables/etat.php").then((response) =>
    setEtat(response.data)
    )
  }  

  useEffect(()=>{
    getActivities();
    getEtat();
  },[]);

  const handleForm = (e)=>{
    e.preventDefault()

    // Clear all inputs form
    e.target.reset()

    // Submit data to task table
    axios.post('http://localhost/gmao-react/backend/tables/task.php', activityData)

    // Hide Form From page
    document.querySelector(".task-section .add-form").classList.remove("showTaskForm")
    document.querySelector(".overly").style.display = "none"
  }

  return (
    <div className="activity-section">
      <SubHeader />
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
      {/* <div className="form-section">
        <div className="add-form">
          <div className="title">Ajouter un activité<i className="fa-solid fa-tags"></i></div>
          <div className="form-content">
            <form onSubmit={handleForm}>
              <div className="form-details">
                <div className="input-box">
                  <label htmlFor="titre" className="details">Titre</label>
                  <input type="text" placeholder="Titre" id="titre" onChanactiviy(e)=>setActivityData({...activityData,'titre': e.target.value})} required/>
                </div>
                <div className="input-box">
                  <label htmlFor="description" className="details">Description</label>
                  <textarea placeholder="Description de la tâche..." id="description" onChanactiviy(e)=>setActivityData({...activityData,'description': e.target.value})} required></textarea>
                </div>
                <div className="input-box">
                  <label htmlFor="dure" className="details">Durée</label>
                  <input type="text" placeholder="Durée" id="dure" onChanactiviy(e)=>setActivityData({...activityData,'dure': e.target.value})} required/>
                </div>
                <div className="input-box">
                  <label className="details">Sélectionnez votre équipement</label>
                  <select onChanactiviy(e)=>setActivityData({...activityData,'equipement_id': e.target.value})} required>
                    <option>List d'équipement</option>
                    {
                      equipements.map((equip)=>{
                        return (
                          <option key={equip.id} value={equip.id}>{equip.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="input-box">
                  <label className="details">Spécifier l'état</label>
                  <select onChanactiviy(e)=>setActivityData({...activityData,'etat_id': e.target.value})} required>
                    <option>Spécifier l'état</option>
                    {
                      etat.map((et)=>{
                        return (
                          <option key={et.id} value={et.id}>{et.etat}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="button">
                <input type="submit" value="Créer"/>
                <input type="reset" value="Vider tout"/>
                <input type="button" onClick={exitForm} value="Fermer"/>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default Activity