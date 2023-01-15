import "./task.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderContent from "../static/HeaderContent";
import { useParams } from "react-router-dom";

const addTask = () => {
  document
    .querySelector(".activities-task .add-form")
    .classList.add("showActivityForm");
  document.querySelector(".overly").style.display = "block";
};


function TaskDetails() {
  const [equipements, setEquipements] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [etat, setEtat] = useState([]);
  const {id} = useParams()

  // main path php
  const mainPath = (page, id, action) => {
    if (page && id && action) {
      return "http://localhost/gmao-react/backend/tables/" +page +"/" +id +"/" +action
    } else if (page && id) {
      return "http://localhost/gmao-react/backend/tables/" + page + "/" + id;
    } else {
      return "http://localhost/gmao-react/backend/tables/" + page;
    }
  };

  // Fetch all equipement data
  const getEquipements = () => {
    axios.get(mainPath("equipement.php")).then((response) => setEquipements(response.data));
  };

  // Fetch task data
  const getTasks = () => {
    axios.get(mainPath("task.php",id)).then((response) => setTasks(response.data));
  };

  // Fetch all activities data
  const getActivities = () => {
    axios.get(mainPath("activity.php")).then((response) => setActivities(response.data));
  };

    console.log(tasks)
  // Fetch all etat data
  const getEtat = () => {
    axios.get(mainPath("etat.php")).then((response) => setEtat(response.data));
  };

  // Submit data to activity table
  const handleForm = (e) => {
    e.preventDefault();

    // Clear all inputs after submit
    e.target.reset();

    // Submit data to task table
    axios.post(mainPath("activity.php"), activityData);

    getTasks()
    // Hide Form From page
    document .querySelector(".activities-task .add-form") .classList.remove("showActivityForm")
  };

  // Hide form after submit data
  const exitForm = () => {
    document.querySelector(".activities-task .add-form").classList.remove("showActivityForm");
  };

  // Show Activity Form
  const addActivity = () => {
    document.querySelector(".activities-task .add-form").classList.add("showActivityForm");
  };
  
  useEffect(() => {
    getEquipements();
    getTasks();
    getEtat();
    getActivities();
  },[]);

  return (
    <div className="task-details-section">
      <HeaderContent title="Tâche Details" />

      <div className="task-content">
        <div className="box-content">
          {/* <div className="box-header">
            <div className="btn-action">Ajouter une activité</div>
          </div> */}
          <div className="box-body">
            <div className="details-info">
              <div className="left-section details-items">
                <div className='items'>
                  <div className="item">
                    <h3 className='item-title'><i className="fa-solid fa-align-left"></i>Description</h3>
                    <span className="item-data">{tasks.description}</span>
                  </div>
                  <div className="item">
                    <div className="item-more">
                      <div className="item-more-info">
                        <h3 className='item-title'><i className="fa-solid fa-calendar-days title-icon"></i>Date</h3>
                        <span className="item-data">{tasks.date}</span>
                      </div>
                      <div className="item-more-info">
                        <h3 className='item-title'><i className="fa-solid fa-battery-half title-icon"></i>Etat</h3>
                      <span className="item-data">{tasks.etat}</span>
                      </div>
                    </div>
                  </div>      
                </div>
                <div className="activities-task">
                  <div className="activities-header">
                    <h2 className="activities-title">Activités</h2>
                    <div className="activities-actions">
                      <div className="add-new btn-action" onClick={addActivity}>Ajouter une activité</div>
                    </div>
                  </div>
                  <div className="form-section">
                    <div className="add-form">
                      <div className="title"> Ajouter une activité <i className="fa-solid fa-tags"></i></div>
                      <div className="form-content">
                        <form onSubmit={handleForm}>
                          <div className="form-details">
                            <div className="input-box">
                              <label htmlFor="description" className="details">Description</label>
                              <textarea placeholder="Description de la tâche..." id="description" onChange={(e) => setActivityData({ ...activityData, description: e.target.value })}></textarea>
                            </div>
                            <div className="input-box">
                              <label htmlFor="dure" className="details">Durée</label>
                              <input type="text" placeholder="Durée" id="dure" onChange={(e) => setActivityData({ ...activityData, dure: e.target.value })}/>
                            </div>
                            <div className="input-box">
                              <label className="details">Spécifier l'état</label>
                              <select onChange={(e) => setActivityData({ ...activityData, etat_id: e.target.value })}>
                                <option>Spécifier l'état</option>
                                {
                                etat.map((et) => {
                                    return (
                                      <option key={et.id} value={et.id}>{et.etat}</option>
                                    )
                                  })
                                }
                              </select>
                            </div>
                          </div>
                          <div className="button">
                            <input type="submit" value="Créer" />
                            <input type="reset" value="Vider tout" />
                            <input type="button" onClick={exitForm} value="Fermer" />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {
                    activities.map((activity,index)=>{
                      return(
                        <div className="activities-items" key={activity.id}>
                          <div className="activity-scroll"><span className="sircle" style={{background : "green"}} title="Pending"></span></div>
                          <div className="activity-item">
                            <div className="activity-item-actions">
                              <i className="fa-solid fa-trash-can icon-delete"></i>
                              <span className="activity-nbr">#{index+1}</span>
                            </div>
                            <div className="activity">
                              <div className="activity-icon"><img src="https://app.mobility-work.com/media/cache/resolve/large/img/profile.JPG"/> </div>  
                              <div className="activity-info">
                                <div className="activity-title">{activity.technicien_id}</div>
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
                                      <p className="activity-data">{activity.etat_id}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className="right-section">
                <div className="right-items">
                  <div className="right-item">
                    <h4 className="right-item-title">Equipement</h4>
                    <div className="right-item-content">
                      <div className="right-item-details">
                        <div className="right-item-icon"><img src="https://app.mobility-work.com/media/cache/resolve/large/images//fake_dataimg/defaultData/climatiseur.jpg"/></div>
                        <div className="right-item-data">
                          <h3 className="right-item-data-title">Nom de l'équipement</h3>
                          <p>{tasks.nom}</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
