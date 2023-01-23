import './equipement.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderContent from "../static/HeaderContent";
import { Link } from 'react-router-dom';
import AddEquipement from './AddEquipement';
import AddTask from '../tasks/AddTask';

function Equipement() {

  const [equipements, setEquipements] = useState([])
  const [filterData, setFilterdata]= useState([]);
  const [service, setService]= useState([]);
  const [equipID, setEquipID]= useState([]);
  const [query, setQuery] = useState('');

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

  // Fetch all data from tables
  const getAllData = () => {
    axios.get(mainPath("equipement.php")).then(res=>{
      setEquipements(res.data)
      setFilterdata(res.data)
    })
    axios.get(mainPath("service.php")).then(res=>{setService(res.data)})
  }

  const addEquipement = ()=>{
    document.querySelector(".equipement-section .add-form").classList.add("showEquipementForm")
    document.querySelector(".overly").style.display = "block"
  }

  const addTask = (e) => {
    document.querySelector(".add-task .add-form").classList.add("showTaskForm");
    document.querySelector(".overly").style.display = "block";
    setEquipID({id : e})
  };

  const handlesearch=(e)=>{
    const getSearch = e.target.value;
    if(getSearch.length > 0){     
      const searchdata = equipements.filter(fl=> fl.nom.toLowerCase().includes(getSearch));
      setEquipements(searchdata);
    }else {
      setEquipements(filterData);
    }
    setQuery(getSearch);
  }

  useEffect(()=>{
    getAllData();
  },[])

  return (
    <div className="equipement-section">
      <AddEquipement />
      <AddTask id={equipID.id}/>
      <HeaderContent title = "Liste d'équipement"/>
      <div className="equipement-content">
        <div className="box-content">
          <div className="box-header">
            <div className="add-equipement btn-action" onClick={addEquipement}>Ajouter un équipement</div>
          </div>
          <div className="box-body">
            <div className="filter-data">
              <div className="search-area input-box">
                <i className="fa-solid fa-magnifying-glass search-icon"></i>
                <input type="text" value={query} onChange={(e)=>handlesearch(e)} placeholder='Cherche ici...' />
              </div>
            </div>
            <div className="task-full-info">
              <span className="task-count"><i className="fa-solid fa-dharmachakra icon-task search-icon"></i>{equipements.length} Equipement(s)</span>
            </div>
            <div className="list-equipements">
              {
                equipements.reverse().map((equip)=>{
                  return (
                    <div className="equipment" key={equip.id}>
                      <Link to={"/equipement-details/"+equip.id} className="box-hero">
                        <img src={"http://localhost/gmao-react/backend/images/"+equip.equip_image} className="box-image"/>
                        <h3 className="box-title" title={equip.nom}>{equip.nom}</h3>
                      </Link>
                      <div className="equipement-more">
                        <ul>
                          <li><span>Ref:</span>     {equip.reference}</li>
                          <li><span>Début:</span>   {equip.dateDebut}</li>
                          <li><span>Service:</span> {service.map(serv=>{return serv.id===equip.service_id?serv.nomService : ''})}</li>
                        </ul>
                      </div>
                      <div className="equipement-actions">
                        <span className="add-task btn-action" onClick={()=>{addTask(equip.id)}}>Ajouter une tâche</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Equipement