import "./task.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderContent from "../static/HeaderContent";
import { Link, useParams } from "react-router-dom";
import HeaderRoutes from "../static/HeaderRoutes";
import ConfirmDelete from "../static/ConfirmDelete";
import AddActivity from "../activities/AddActivity";
import SuccessAction from "../static/SuccessAction";

function TaskDetails() {
  const {id} = useParams()
  const [equipements, setEquipements] = useState([]);
  const [task, setTask] = useState([]);
  const [etat, setEtat] = useState([]);
  const [activities, setActivities] = useState([]);
  const [technicien, setTechnicien] = useState([]);

  const mainPath = (page, id, action) => {
    if (page && id && action) {
      return "http://localhost/gmao-react/backend/tables/" +page +"/" +id +"/" +action
    } else if (page && id) {
      return "http://localhost/gmao-react/backend/tables/" + page + "/" + id;
    } else {
      return "http://localhost/gmao-react/backend/tables/" + page;
    }
  }

  const getAllData = () => {
    axios.get(mainPath("activity.php")).then((response) => setActivities(response.data));
    axios.get(mainPath("equipement.php")).then((response) => setEquipements(response.data));
    axios.get(mainPath("task.php",id)).then((response) => setTask(response.data));
    axios.get(mainPath("etat.php")).then((response) => setEtat(response.data));
    axios.get(mainPath("technicien.php")).then((response) => setTechnicien(response.data));
  }

  const addActivity = () => {
    document.querySelector(".activities-task .add-form").classList.add("showActivityForm");
  }

  const updateEtat = ()=>{
    axios.put(mainPath("task.php"))
  }

  const etatTask = etat.map(et=>{
      return et.id === task.etat_id?<span className="task-etat" style={{"border" : `1px solid ${et.couleur}`,color : et.couleur}} key={et.id}>{et.etat}</span>:""})
  
  const handleDelete = (id)=>{
    document.querySelector(".confirm-delete").classList.add("show")
    document.querySelector(".overly").style.display = "block"
    document.querySelector(".delete-actions .confirm").addEventListener(("click"),()=>{
      axios.delete((mainPath("activity.php",id)))
      document.querySelector(".confirm-delete").classList.remove("show")
      document.querySelector(".success-action .success-remove .card-success").classList.add("showRemove")
      setTimeout(()=>{
        document.querySelector(".success-action .success-remove .card-success").classList.remove("showRemove")
        getAllData()
      },3000)
      document.querySelector(".overly").style.display = "none"
    })
  }
  
  useEffect(() => {
    getAllData()
  },[])

  return (
    <div className="task-details">
      <HeaderRoutes />
      <ConfirmDelete />
      <SuccessAction />
      <div className="task-content">
        <div className="box-content">
          <div className="box-header">
            <div className="task-teails-header">{etatTask}</div>
            <div className="btn-action" onClick={updateEtat}>Marquer comme terminé</div>
          </div>
          <div className="box-body">
            <div className="details-info">
              <div className="left-section details-items">
                <div className='items'>
                  <div className="item">
                    <h3 className='item-title'><i className="fa-solid fa-align-left"></i>Description</h3>
                    <span className="item-data">{task.description}</span>
                  </div>
                  <div className="item">
                    <div className="item-more">
                      <div className="item-more-info">
                        <h3 className='item-title'><i className="fa-solid fa-calendar-days title-icon"></i>Date prévue</h3>
                        <span className="item-data">{new Date(task.date).toDateString()+" - "+new Date(task.end_date).toDateString()}</span>
                      </div>
                      <div className="item-more-info">
                        <h3 className='item-title'><i className="fa-solid fa-clock"></i>Durée</h3>
                        <span className="item-data">{task.dure > 1 ? task.dure+" Jours" : "Moins d'un jour"}</span>
                      </div>
                      <div className="item-more-info">
                        <h3 className='item-title'><i className="fa-solid fa-battery-half title-icon"></i>Etat</h3>
                      <span className="item-data">{
                        etat.map(et=>{
                          if (et.id === task.etat_id){
                            return et.etat
                          }
                        })
                      }</span>
                      </div>
                    </div>
                  </div>
                  {equipements.map(equip=>{
                    if(equip.id===task.equipement_id){
                      return (
                        <div className="right-item" key={equip.id}>
                          <h3 className="right-item-title">{equip.nom}</h3>
                          <div className="right-item-icon">
                            <img key={equip.id} src={'http://localhost/gmao-react/backend/images/'+equip.equip_image}/>
                          </div>
                        </div>  
                      )
                    }})
                  }
                </div>
                <div className="activities-task">
                  <div className="activities-header">
                    <h2 className="activities-title">Activités</h2>
                    <div className="activities-actions">{
                      etat.map(et=>{
                        if(et.id === task.etat_id){
                          return et.etat!=="Terminée"?<div className="add-new btn-action" onClick={addActivity}>Ajouter une activité</div> :<div className="add-new btn-action btn-disabled" title="la tâche a été terminée">Ajouter une activité</div>
                        }})
                      }
                    </div>
                  </div>
                  <AddActivity myId={id}/>
                  {
                    activities.map((activity,index)=>{
                      if (activity.tache_id === task.id){
                        return(
                        <div key={index}>
                          {
                            etat.map(et=>{
                              if(et.id===activity.etat_id){
                                return (
                                  <div className="activities-items" key={et.id}>
                                    <div className="activity-scroll">
                                      <span className="sircle" style={
                                        et.couleur === "orange" ?{animation: "identifier infinite alternate 1s",background : et.couleur}:{background : et.couleur}
                                        } title={et.etat}></span>
                                    </div>
                                    <div className="activity-item">
                                      <div className="activity-item-actions">
                                        <i className="fa-solid fa-trash-can icon-delete" onClick={()=>{handleDelete(activity.id)}}></i>
                                        <span className="activity-nbr">#{index+1}</span>
                                      </div>
                                      <div className="activity">
                                        <div className="activity-icon"><img src="https://app.mobility-work.com/media/cache/resolve/large/img/profile.JPG"/> </div>  
                                        <div className="activity-info">
                                          <div className="activity-title">
                                            {
                                              technicien.map(tech=>{
                                                if (tech.id === activity.technicien_id){
                                                  return <Link to={"/tech-details/"+tech.id} key={tech.id} >{tech.nom}</Link>
                                                }
                                              })
                                            }
                                          </div>
                                        </div>
                                      </div>
                                      <div className="activity">
                                        <div className="activity-icon"><i className="fa-solid fa-align-left"></i></div>  
                                        <div className="activity-info">
                                          <div className="activity-title">Description</div>
                                          <p className="activity-data">{activity.description}</p>
                                        </div>
                                      </div>
                                      <div className="activity">
                                        <div className="activity-calender">
                                          <div className="activity-date">
                                            <div className="activity-icon"><i className="fa-solid fa-calendar-days title-icon"></i></div>  
                                            <div className="activity-info">
                                              <div className="activity-title">Réalisée le</div>
                                              <p className="activity-data">{activity.date}</p>
                                            </div>
                                          </div>
                                          <div className="activity-date">
                                            <div className="activity-icon"><i className="fa-solid fa-clock-rotate-left"></i></div>  
                                            <div className="activity-info">
                                              <div className="activity-title">Temps passé</div>
                                              <p className="activity-data">0mn</p>
                                            </div>
                                          </div>
                                          <div className="activity-date">
                                            <div className="activity">
                                              <div className="activity-icon"></div>  
                                              <div className="activity-info">
                                                <div className="activity-title">Etat</div>
                                                <p className="activity-data">{et.etat}</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              }
                            })
                          }
                        </div>
                      )
                    }
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;