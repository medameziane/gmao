import './equipement.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UpdateEquipement from './UpdateEquipement';
import ConfirmDelete from '../static/ConfirmDelete';

function EquipementDetails() {
  const {id} = useParams()
  const navigate = useNavigate()
  const [equipement, setEquipement] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [etat, setEtat] = useState([]);
  const [service, setService] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [taskData, setTaskData] = useState({
    equipement_id : id
  });
  
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
  
  const getAllData = () => {
    axios.get(mainPath("equipement.php",id)).then((res) => setEquipement(res.data));
    axios.get(mainPath("task.php")).then((res) => setTasks(res.data));
    axios.get(mainPath("etat.php")).then((res) => setEtat(res.data));
    axios.get(mainPath("categorie.php")).then((res) => setCategorie(res.data));
    axios.get(mainPath("service.php")).then((res) => setService(res.data));
  };

  const addTask = () => {
    document.querySelector(".equipement-additional .add-form").classList.add("showtaskform");
  };

  const handleUpdate = () => {
    document.querySelector(".update-equipement .add-form").classList.add("showupdateform");
  };

  const handleDelete = ()=>{
    document.querySelector(".confirm-delete").classList.add("show")
    document.querySelector(".overly").style.display = "block"
    document.querySelector(".delete-actions .confirm").addEventListener(("click"),()=>{
      axios.delete((mainPath("equipement.php",id)))
      navigate("/equipment")
      document.querySelector(".confirm-delete").classList.remove("show")
      document.querySelector(".overly").style.display = "none"
    })
  }


  const exitForm = () => {
    document.querySelector(".equipement-additional .add-form").classList.remove("showtaskform");
  };

  // Submit data to tache table
  const handleForm = (e) => {
    e.preventDefault();
    
    // Submit data to task table
    axios.post(mainPath("task.php"), taskData);
    getAllData();
    
    // Hide Form From page
    document.querySelector(".equipement-additional .add-form").classList.remove("showtaskform")
    e.target.reset();
  };

  useEffect(() => {
    getAllData()
  },[]);

  return (
    <div className='equipement-details'>
      <div className="box-content">
        <div className="box-header">
          <span className="btn-action" onClick={addTask}>Ajouter une tâche</span>
          <div className="equipement-actions">
            <span className="btn-action btn-edit" onClick={handleUpdate}>Modifier l'équipement</span>
            <span className="btn-action btn-delete" onClick={handleDelete}>Supprimer l'équipement</span>
          </div>
        </div>
        <div className="box-body">
          <div className="details-items">
            <div className='items'>
              <div className="item-image">
                <img src={"http://localhost/gmao-react/backend/images/"+equipement.equip_image}/>
              </div>  
              <div className="info-details">
                <span className="equi-item-title">{equipement.nom}</span>
                <div className="item-info-description">
                  <h3 className='item-title'>Description</h3>
                  <span className="item-data">{equipement.description}</span>
                </div>
                <div className="info-items">
                  <div className="item-info">
                    <h3 className='item-title'><i className="fa-solid fa-calendar-days"></i>Date Début</h3>
                    <span className="item-data">{equipement.dateDebut}</span>
                  </div>
                  {/* <div className="item-info">
                    <h3 className='item-title'><i className="fa-solid fa-eye"></i>Visibility</h3>
                    <span className="item-data">Public</span>
                  </div> */}
                  <div className="item-info">
                    <h3 className='item-title'><i className="fa-solid fa-tag"></i>Catégorie</h3>
                    <span className="item-data">{
                      categorie.map(cat=>{
                        return cat.id === equipement.categorie_id ? cat.categorie : ''
                      })
                    }</span>
                  </div>
                  <div className="item-info">
                    <h3 className='item-title'><i className="fa-solid fa-r"></i>Reference</h3>
                    <span className="item-data">{equipement.reference}</span>
                  </div>
                  <div className="item-info">
                    <h3 className='item-title'><i className="fa-solid fa-screwdriver-wrench"></i>Service</h3>
                    <span className="item-data">{service.map(serv=>{
                        return serv.id === equipement.service_id ? serv.nomService : ''
                      })}</span>
                  </div>
                  <div className="item-info">
                    <h3 className='item-title'><i className="fa-solid fa-m"></i>Marque</h3>
                    <span className="item-data">{equipement.marque}</span>
                  </div>
                  <div className="item-info">
                    <h3 className='item-title'><i className="fa-solid fa-money-bill"></i>Prix</h3>
                    <span className="item-data">{equipement.prix}</span>
                  </div>
                </div>
              </div>   
            </div>
          </div>
          <div className="equipement-additional">
            <div className="equipement-tasks">
            <div className="form-section">
              <div className="add-form">
                <div className="title">Ajouter une nouvelle tâche</div>
                <div className="form-content">
                  <form onSubmit={handleForm}>
                    <div className="form-details">
                      <div className="input-box">
                        <label htmlFor="description" className="details">Description</label>
                        <textarea placeholder="Description de la tâche..." id="description" onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}></textarea>
                      </div>
                      <div className="input-box">
                        <label htmlFor="dure" className="details">Durée</label>
                        <input type="text" placeholder="Durée" id="dure" onChange={(e) => setTaskData({ ...taskData, dure: e.target.value })}/>
                      </div>
                      <div className="input-box">
                        <label className="details">Spécifier l'état</label>
                        <select onChange={(e) => setTaskData({ ...taskData, etat_id: e.target.value })}>
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
                tasks.map(task=>{
                  if (task.equipement_id === equipement.id){
                    return (
                      <Link to={"/task-details/"+task.id} key={task.id}>
                      <div className="equip-task">
                        <div className="equip-task-icon"><i className="fa-solid fa-calendar-days"></i></div>
                        <div className="equip-task-info">
                          <div className="task-info-date">{task.date}</div>
                          <p className="task-info-des">{task.description}</p>
                          <div className="task-info-etat">{
                            etat.map(et=>{
                              if (et.id === task.etat_id){
                                return et.etat
                              }
                            })
                          }</div>
                        </div>
                      </div>
                    </Link>
                    )
                  }
                })
              }          
            </div>
          </div>
          <UpdateEquipement />
          <ConfirmDelete />
        </div>
      </div>
    </div>
  )
}

export default EquipementDetails
