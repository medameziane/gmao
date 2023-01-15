import axios from 'axios'
import React, { useEffect, useState } from 'react'

function TaskUpdate() {
  const [equipements, setEquipements] = useState([])
  const [tasks,setTasks]=useState([])
  const [etat,setEtat]=useState([])
  const [taskData,setTaskData]=useState({})
  const [inputEtat,setinputEtat]=useState({
    "status" : true
  })

  // main path php 
  const mainPath = (page,id,action)=>{
    if (page && id && action){
      return "http://localhost/gmao-react/backend/tables/"+page+"/"+id+"/"+action
    } 
    else if (page && id ){
      return "http://localhost/gmao-react/backend/tables/"+page+"/"+id
    }
    else{
      return "http://localhost/gmao-react/backend/tables/"+page
    }
  }

  // Fetch all equipement data
  const getEqui = () => {
    axios.get(mainPath("equipement.php")).then((response) =>
    setEquipements(response.data)
    )
  }  

  // Fetch all tasks data
  const getTasks = () => {
    axios.get(mainPath("task.php")).then((response) =>
    setTasks(response.data)
    )
  }

  // Fetch all etat data
  const getEtat = () => {
    axios.get(mainPath("etat.php")).then((response) =>
    setEtat(response.data)
    )
  }  

  // Submit data to tache table
  const handleForm = (e)=>{
    e.preventDefault()

    // Clear all inputs form
    e.target.reset()

    // Submit data to task table
    axios.post(mainPath("task.php"), taskData)

    // Hide Form From page
    document.querySelector(".task-section .add-form").classList.remove("showTaskForm")
    document.querySelector(".overly").style.display = "none"
  }

  // Edit Information
  const handleEdit = (e)=>{
    setinputEtat({status : false})
    document.querySelectorAll(".task-info .input-info").forEach(myInput=>{
      myInput.classList.add('edit')
    })
    console.log("clicked")
  }


  // Edit task
  const editTask = (e) =>{
    // axios.put(mainPath("task.php",id,"edit"),taskData).then((response)=>{
    //   console.log(response.data)
    // })
    // setinputEtat({status : true})
    // document.querySelectorAll(".task-info .input-info").forEach(editInput=>{
    //   editInput.classList.remove("edit")
    // })
    // document.querySelectorAll(".task-info .icon-valid").forEach(valid=>{
    //   if (valid.style.display="block"){
    //     valid.style.display="none"
    //   }
    // })
  }

  useEffect(()=>{
    getEqui();
    getTasks();
    getEtat();
  });

  return (
    <div className="update-section">
      <div className="add-form">
        <div className="title">Mise à jour de la tâche<i className="fa-solid fa-tags"></i></div>
        <div className="form-content">
          <form>
            <div className="form-details">
              <div className="input-box">
                <label htmlFor="titre" className="details">Mise à jour du titre</label>
                <input type="text" placeholder="Titre" id="titre"/>
              </div>
              <div className="input-box">
                <label htmlFor="description" className="details">Mise à jour du Description</label>
                <textarea placeholder="Description de la tâche..." id="description"></textarea>
              </div>
              <div className="input-box">
                <label htmlFor="dure" className="details">Mise à jour du Durée</label>
                <input type="text" placeholder="Durée" id="dure"/>
              </div>
              <div className="input-box">
                <label className="details">Mise à jour d'équipement</label>
                <select>
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
                <label className="details">Mise à jour d'état</label>
                <select>
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
              <input type="submit" value="Mise à jour"/>
              <input type="reset" value="Vider tout"/>
              <input type="button" value="Fermer"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TaskUpdate
