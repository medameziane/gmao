import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SuccessAction from '../static/SuccessAction';

function AddTechnicien() {
  const [technicienData, setTechnicienData]= useState({});
  const [specialites, setSpecialites] = useState([]);

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

  // Hide form after submit data
  const exitForm = () => {
    document.querySelector(".add-task .add-form").classList.remove("showTaskForm");
    document.querySelector(".overly").style.display = "none";
  };

  const handleChange = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setTechnicienData(values => ({...values , [name] : value}))
  }
  // Get all data we need from table
  const getAllData = () => {
    axios.get(mainPath("specialite.php")).then(res=> setSpecialites(res.data));
  };
  
  // Submit data to tache table
  const handleForm = (e) => {
    e.preventDefault();
    
    // Submit data to task table
    axios.post(mainPath("technicien.php"), technicienData);
    getAllData();
    
    // Hide Form From page
    document .querySelector(".add-task .add-form") .classList.remove("showTaskForm")
    document.querySelector(".success-action .card-success").classList.add("showSuccess")
    setTimeout(()=>{
      document.querySelector(".success-action .card-success").classList.remove("showSuccess")
    },5000)
    document.querySelector(".overly").style.display = "none"
    e.target.reset();
  };

  useEffect(() => {
    getAllData()
  },[]);

  return (
    <div className='add-task'>
      <SuccessAction action="Ajouté"/>
      <div className="form-section">
        <div className="add-form">
          <div className="title">Ajouter un téchnicien <i className="fa-solid fa-user"></i></div>
          <div className="form-content">
            <form onSubmit={handleForm}>
              <div className="form-details">
                <div className="input-box">
                  <label htmlFor="nom" className="details">Nom</label>
                  <input type="text" placeholder="nom" id="nom" name="nom" onChange={handleChange} required/>
                </div>
                <div className="input-box">
                  <label htmlFor="prenom" className="details">Prenom</label>
                  <input type="text" placeholder="prenom" id="prenom" name="prenom" onChange={handleChange} required/>
                </div>
                <div className="input-box">
                  <label htmlFor="email" className="details">Email</label>
                  <input type="email" placeholder="email" id="email" name="email" onChange={handleChange} required/>
                </div>
                <div className="input-box">
                  <label htmlFor="phone" className="details">Téléphone</label>
                  <input type="phone" placeholder="phone" id="phone" name="phone" onChange={handleChange} required/>
                </div>
                <div className="input-box">
                  <label className="details">Spécifier la spécialité</label>
                  <select name='specialite_id' onChange={handleChange} required>
                    <option value="" disabled selected>Spécialité</option>
                    {
                      specialites.map((sp)=>{
                        return (
                          <option key={sp.id} value={sp.id}>{sp.specialite}</option>
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

export default AddTechnicien
