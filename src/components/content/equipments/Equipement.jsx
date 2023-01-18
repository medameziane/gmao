import './equipement.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderContent from "../static/HeaderContent";
import SubHeader from "../static/SubHeader";
import { Link } from 'react-router-dom';
import AddEquipement from './AddEquipement';

function Equipement() {

  const [equipements, setEquipements] = useState([])
  const [filterData, setFilterdata]= useState([]);
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
  }
  
  const addEquipement = ()=>{
    document.querySelector(".equipement-section .add-form").classList.add("showEquipementForm")
    document.querySelector(".overly").style.display = "block"
  }

  // Search data from table
  const handlesearch=(event)=>{
    const getSearch = event.target.value;
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
  }, []);

  return (
    <div className="equipement-section">
      <SubHeader />
      <AddEquipement />
      <HeaderContent title = "List d'Équipement"/>
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
                equipements.map((equip)=>{
                  return (
                    <div className="equipment" key={equip.id}>
                      <Link to={"/equipement-details/"+equip.id} className="box-hero">
                        <img src={"http://localhost/gmao-react/backend/images/"+equip.equip_image} className="box-image"/>
                        <h3 className="box-title">{equip.nom}</h3>
                      </Link>
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