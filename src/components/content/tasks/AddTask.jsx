import axios from 'axios';
import React, { useEffect, useState } from 'react'

function AddTask(props){
  const [taskData, setTaskData] = useState({});
  const [etat, setEtat] = useState([]);
  const [equipements, setEquipements] = useState([]);

  const mainPath = (page, id, action) => {
    if (page && id && action) {
      return "http://localhost/gmao-react/backend/tables/" +page +"/" +id +"/" +action
    } else if (page && id) {
      return "http://localhost/gmao-react/backend/tables/" + page + "/" + id;
    } else {
      return "http://localhost/gmao-react/backend/tables/" + page;
    }
  };

  const exitForm = () => {
    document.querySelector(".add-task .add-form").classList.remove("showTaskForm");
    document.querySelector(".overly").style.display = "none";
  };

  const getAllData = () => {
    axios.get(mainPath("etat.php")).then(res => setEtat(res.data));
    axios.get(mainPath("equipement.php")).then(res=> setEquipements(res.data));
  };
  
  const handleForm = (e) => {
    e.preventDefault();
    
    axios.post(mainPath("task.php"), taskData);
    
    document .querySelector(".add-task .add-form") .classList.remove("showTaskForm")
    document.querySelector(".overly").style.display = "none"
    e.target.reset();
  };

  useEffect(() => {
    getAllData()
  },[])

  return (
    <div className='add-task'>
      <div className="form-section">
        <div className="add-form">
          <div className="title"> Ajouter un tâche <i className="fa-solid fa-xmark" onClick={exitForm}></i></div>
          <div className="form-content">
            <form onSubmit={handleForm}>
              <div className="form-details">
                <div className="input-box">
                  <label className="details">Sélectionnez équipement</label>
                  <select onChange={(e) => setTaskData({...taskData,equipement_id: e.target.value})}>
                    <option>List d'équipement</option>{
                      equipements.map(equip=> {
                        if(props.id){
                          return equip.id === props.id ?<option key={equip.id} value={equip.id}>{equip.nom}</option>:""
                        }else{
                          return <option key={equip.id} value={equip.id}>{equip.nom}</option>
                        }
                    })}
                  </select>
                </div>
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
    </div>
  )
}

export default AddTask
