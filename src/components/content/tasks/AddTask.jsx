import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SuccessAction from '../static/SuccessAction';

// Get Current Date
let localDate = new Date();
let getDay = localDate.getDate() 
let getMonth = localDate.getMonth()
let getYears = localDate.getFullYear()

if(localDate.getDate()<10){
 getDay =  "0"+localDate.getDate() 
}
if(localDate.getMonth()<10){
  getMonth =  "0"+(localDate.getMonth() +1)
}

function AddTask(props){
  const navigate = useNavigate()
  const [taskData, setTaskData] = useState({});
  const [etat, setEtat] = useState([]);
  const [equipements, setEquipements] = useState([]);
  const [inputEtat, setInputEtat] = useState(true)

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
    const date1 = new Date(taskData.start_date);
    const date2 = new Date(taskData.end_date);
    if(taskData.start_date && taskData.end_date){
      const Difference_In_Time = date2.getTime() - date1.getTime();
      const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      setTaskData({...taskData , "dure" : Difference_In_Days})
    }
    const name = e.target.name
    const value = e.target.value
    setTaskData(values => ({...values , [name] : value}))
  }

  const handleForm = (e) => {
    e.preventDefault();
    axios.post(mainPath("task.php"), taskData);
    document.querySelector(".add-task .add-form").classList.remove("showTaskForm")
    document.querySelector(".overly").style.display = "none"
    document.querySelector(".success-task .card-success").classList.add("showTask")
    setTimeout(()=>{
      document.querySelector(".success-task .card-success").classList.remove("showTask")
      // navigate(0)
    },3000)
    
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
      <SuccessAction />
      <div className="form-section">
        <div className="add-form">
          <div className="title">Ajouter un tâche <i className="fa-solid fa-xmark" onClick={exitForm}></i></div>
          <div className="form-content">
            <form onSubmit={handleForm}>
              <div className="form-details">
                <div className="input-box">
                  {
                    props.id ? equipements.map(equip=>{
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
                  <label htmlFor='start_date' className="details">Démarrer la tâche le</label>
                  {
                    props.bet_date ?<input type="date" defaultValue={props.bet_date.startStr} readOnly/> // If true 
                    : <input type="date" id="start_date" min={getYears+"-"+getMonth+"-"+getDay} onChange={(e)=>{setTaskData({...taskData , "start_date" : e.target.value})
                    setInputEtat(false)}} required/> // If false
                  }
                </div>
                <div className="input-box">
                  <label htmlFor='end_date' className="details">Fin de tâche le</label>
                  {
                    props.bet_date ?<input type="date" defaultValue={props.bet_date.endStr} readOnly/> // If true 
                    : <input type="date" disabled={inputEtat} id="end_date" min={taskData.start_date} onChange={(e)=>{setTaskData({...taskData , "end_date" : e.target.value})}} required/> // If false
                  }
                </div>
                <div className="input-box">
                  <label htmlFor="description" className="details">Description</label>
                  <textarea placeholder="Description..." id="description" name="description" onChange={(e)=>{
                    if(props.id){
                      setTaskData({...taskData,"equipement_id" : props.id,"description" : e.target.value})
                    }
                    else if(props.bet_date){
                      setTaskData({...taskData,"start_date":props.bet_date.startStr,"end_date":props.bet_date.endStr,"description":e.target.value})
                    }
                    else{
                      setTaskData({...taskData,"description" : e.target.value})
                    }
                  }
                  } required></textarea>
                </div>
                <div className="input-box">
                  <label className="details">Spécifier l'état</label>
                  <select name='etat_id' onChange={handleChange} required>
                    <option defaultValue="" disabled selected>Spécifier l'état</option>{
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
