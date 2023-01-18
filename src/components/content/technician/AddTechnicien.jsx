import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
    document.querySelector(".overly").style.display = "none"
    e.target.reset();
  };

  useEffect(() => {
    getAllData()
  },[]);

  return (
    <div className='add-task'>
      <div className="form-section">
        <div className="add-form">
          <div className="title">Ajouter un téchnicien <i className="fa-solid fa-user"></i></div>
          <div className="form-content">
            <form onSubmit={handleForm}>
              <div className="form-details">
                <div className="input-box">
                  <label htmlFor="nom" className="details">Nom</label>
                  <input type="text" placeholder="nom" id="nom" onChange={(e)=>setTechnicienData({...technicienData,'nom': e.target.value})}/>
                </div>
                <div className="input-box">
                  <label htmlFor="prenom" className="details">Prenom</label>
                  <input type="text" placeholder="prenom" id="prenom" onChange={(e)=>setTechnicienData({...technicienData,'prenom': e.target.value})}/>
                </div>
                <div className="input-box">
                  <label htmlFor="email" className="details">Email</label>
                  <input type="text" placeholder="email" id="email" onChange={(e)=>setTechnicienData({...technicienData,'email': e.target.value})}/>
                </div>
                <div className="input-box">
                  <label htmlFor="phone" className="details">Téléphone</label>
                  <input type="phone" placeholder="phone" id="phone" onChange={(e)=>setTechnicienData({...technicienData,'phone': e.target.value})}/>
                </div>
                <div className="input-box">
                  <label className="details">Spécifier la spécialité</label>
                  <select onChange={(e)=>setTechnicienData({...technicienData,'specialite_id': e.target.value})} required>
                    <option>Spécifier l'état</option>
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
