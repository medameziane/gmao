import './task.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderContent from "../static/HeaderContent";

const addTask = ()=>{
  document.querySelector(".task-section .add-form").classList.add("showTaskForm")
  document.querySelector(".overly").style.display = "block"
}

const exitForm = ()=>{
  document.querySelector(".task-section .add-form").classList.remove("showTaskForm")
  document.querySelector(".overly").style.display = "none"
}

function Task() {
  const [equipements, setEquipements] = useState([])
  const [tasks,setTasks]=useState([])
  const [etat,setEtat]=useState([])
  const [taskData,setTaskData]=useState({})

  // Fetch all data from equipement table
  const getEqui = () => {
    axios.get("http://localhost/gmao-react/backend/tables/equipement.php").then((response) =>
    setEquipements(response.data)
    )
  }  

  // Fetch all data from tasks table
  const getTasks = () => {
    axios.get("http://localhost/gmao-react/backend/tables/task.php").then((response) =>
    setTasks(response.data)
    )
  }  

  // Fetch all data from etat table
  const getEtat = () => {
    axios.get("http://localhost/gmao-react/backend/tables/etat.php").then((response) =>
    setEtat(response.data)
    )
  }  

  useEffect(()=>{
    getEqui();
    getTasks();
    getEtat();
  },[]);

  const handleForm = (e)=>{
    e.preventDefault()

    // Clear all inputs form
    e.target.reset()

    // Submit data to task table
    axios.post('http://localhost/gmao-react/backend/tables/task.php', taskData)

    // Hide Form From page
    document.querySelector(".task-section .add-form").classList.remove("showTaskForm")
    document.querySelector(".overly").style.display = "none"
  }

  return (
    <div className="task-section">
      <HeaderContent title = "liste des tâches"/>
      <div className="task-content">
        <div className="box-content">
          <div className="box-header">
            <div className="btn-action" onClick={addTask}>Créer tâche</div>
          </div>
          <div className="box-body">
            <ul className="list-tasks">
              {
                tasks.map((task)=>{
                  return(
                    <li className="task" key={task.id}>
                      <a href="#" className='task-header'>
                        <i className="fa-solid fa-list-check task-icon"></i>
                        <h2 className="task-title">{task.titre}</h2>
                      </a>
                      <div className="list-actions">
                        <span className="btn-edit btn-action">Modifier</span>
                        <span className="btn-delete btn-action">Supprimer</span>
                        <span className="btn-view btn-action">View</span>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="form-section">
        <div className="add-form">
          <div className="title">Ajouter un tâche <i className="fa-solid fa-tags"></i></div>
          <div className="form-content">
            <form onSubmit={handleForm}>
              <div className="form-details">
                <div className="input-box">
                  <label htmlFor="titre" className="details">Titre</label>
                  <input type="text" placeholder="Titre" id="titre" onChange={(e)=>setTaskData({...taskData,'titre': e.target.value})} required/>
                </div>
                <div className="input-box">
                  <label htmlFor="description" className="details">Description</label>
                  <textarea placeholder="Description de la tâche..." id="description" onChange={(e)=>setTaskData({...taskData,'description': e.target.value})} required></textarea>
                </div>
                <div className="input-box">
                  <label htmlFor="dure" className="details">Durée</label>
                  <input type="text" placeholder="Durée" id="dure" onChange={(e)=>setTaskData({...taskData,'dure': e.target.value})} required/>
                </div>
                <div className="input-box">
                  <label className="details">Sélectionnez votre équipement</label>
                  <select onChange={(e)=>setTaskData({...taskData,'equipement_id': e.target.value})} required>
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
                  <select onChange={(e)=>setTaskData({...taskData,'etat_id': e.target.value})} required>
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
      </div>
    </div>
  )
}

export default Task