import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SuccessAction from '../static/SuccessAction';

function AddActivity(props){
  const navigate = useNavigate()
  const [etat, setEtat] = useState([]);
  const [technicien, setTechnicien] = useState([]);
  const [activityData, setActivityData] = useState({})
  const [inputEtat, setInputEtat] = useState(true)

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
    axios.get(mainPath("etat.php")).then((response) => setEtat(response.data));
    axios.get(mainPath("technicien.php")).then((response) => setTechnicien(response.data));
  }

  const handleChange = (e)=>{
    const date1 = new Date(activityData.start_date);
    const date2 = new Date(activityData.end_date);
    if(activityData.start_date && activityData.end_date){
      const Difference_In_Time = date2.getTime() - date1.getTime();
      const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      setActivityData({...activityData , "dure" : Difference_In_Days})
    }

    const name = e.target.name
    const value = e.target.value
    setActivityData(values => ({...values , [name] : value}))
  }

  const handleForm = (e) => {
    e.preventDefault();
    e.target.reset();
    axios.post(mainPath("activity.php"), activityData);
    document .querySelector(".activities-task .add-form") .classList.remove("showActivityForm")
    document.querySelector(".add-activity .success-activity .card-success").classList.add("showActivity")
    setTimeout(()=>{
      document.querySelector(".add-activity .success-activity .card-success").classList.remove("showActivity")
      navigate(0)
    },3000)
  }

  const exitForm = () => {
    document.querySelector(".activities-task .add-form").classList.remove("showActivityForm");
  }

  useEffect(() => {
    getAllData()
  },[])
  return (
    <div className='add-activity'>
      <SuccessAction />
      <div className="form-section">
        <div className="add-form">
          <div className="title"> Ajouter une activité <i className="fa-solid fa-tags"></i></div>
          <div className="form-content">
            <form onSubmit={handleForm}>
              <div className="form-details">
                <div className="input-box">
                  <label htmlFor="description" className="details">Description</label>
                  <textarea placeholder="Description de la tâche..." id="description" name="description" onChange={handleChange} required></textarea>
                </div>
                <div className="group-input">
                  <div className="input-box">
                    <label htmlFor='start_date' className="details">Démarrer l'activité le</label>
                    <input type="date" placeholder="start_date" id="start_date" name='start_date' min={getYears+"-"+getMonth+"-"+getDay} onChange={
                      (e)=>{
                        setActivityData({...activityData , "start_date" : e.target.value})
                        setInputEtat(false)
                      }
                      } required/>
                  </div>
                  <div className="input-box">
                    <label htmlFor='end_date' className="details">Fin l'activité le</label>
                    <input type="date" placeholder="end_date" id="end_date" name='end_date' disabled = {inputEtat} min={activityData.start_date} onChange={(e)=>{setActivityData({...activityData , "end_date" : e.target.value,"tache_id" : props.myId})}} required/>
                  </div>
                </div>
                <div className="group-input">
                <div className="input-box">
                  <label className="details">Spécifier l'état</label>
                  <select name="etat_id" onChange={handleChange} required>
                    <option value="" selected disabled>Spécifier l'état</option>
                    {
                    etat.map(et=>{
                      return <option key={et.id} value={et.id}>{et.etat}</option>
                      })
                    }
                  </select>
                </div>
                <div className="input-box">
                  <label className="details">Téchnicien</label>
                  <select name="technicien_id" onChange={handleChange} required>
                    <option value="" selected disabled>Spécifier Téchnicien</option>
                    {
                      technicien.map(tech=>{
                        return <option key={tech.id} value={tech.id}>{tech.nom}</option>
                      })
                    }
                  </select>
                </div>
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

export default AddActivity
