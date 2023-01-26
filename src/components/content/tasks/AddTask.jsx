import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SuccessAction from '../static/SuccessAction';

function AddTask(props){
  const navigate = useNavigate()
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
  
  const handleChange = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setTaskData(values => ({...values , [name] : value}))
  }
  
  const handleForm = (e) => {
    e.preventDefault();
    axios.post(mainPath("task.php"), taskData);
    document.querySelector(".add-task .add-form").classList.remove("showTaskForm")
    document.querySelector(".overly").style.display = "none"
    setTimeout(()=>{
      document.querySelector(".success-action .card-success").classList.remove("showSuccess")
    },5000)
    if(props.id){
      navigate("/equipement-details/"+props.id)
    }
    e.target.reset();
  };

  useEffect(() => {
    getAllData()
  },[])

  return (
    <div className='add-task'>
      <SuccessAction action="Ajouté"/>
      <div className="form-section">
        <div className="add-form">
          <div className="title"> Ajouter un tâche <i className="fa-solid fa-xmark" onClick={exitForm}></i></div>
          <div className="form-content">
            <form onSubmit={handleForm}>
              <div className="form-details">
                <div className="input-box">
                  {
                    props.id?equipements.map(equip=>{
                      return equip.id === props.id ?<input type ="text" key={equip.id} readOnly defaultValue={equip.nom}/>:""
                    }):
                    <>
                      <label className="details">Sélectionnez équipement</label>
                      <select name='equipement_id' onChange={handleChange} required>
                        <option value="" disabled selected>List d'équipement</option>
                        {equipements.map(equip=>{return <option key={equip.id} value={equip.id}>{equip.nom}</option>})}
                      </select>
                    </>
                  }
                </div>
                <div className="input-box">
                  <label htmlFor="description" className="details">Description</label>
                  <textarea placeholder="Description..." id="description" name="description" onChange={(e)=>{
                    if(props.id){
                      setTaskData({...taskData,"equipement_id" : props.id,"description" : e.target.value})
                    }else{
                      setTaskData({...taskData,"description" : e.target.value})
                    }
                  }
                  } required></textarea>
                </div>
                <div className="input-box">
                  <label htmlFor="dure" className="details">Durée</label>
                  <input type="text" placeholder="Durée" id="dure" name='dure' onChange={handleChange} required/>
                </div>
                <div className="input-box">
                  <label className="details">Spécifier l'état</label>
                  <select name='etat_id' onChange={handleChange} required>
                    <option value="" disabled selected>Spécifier l'état</option>{
                    etat.map(et=>{
                      return(<option key={et.id} value={et.id}>{et.etat}</option>)
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
