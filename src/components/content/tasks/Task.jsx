import "./task.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderContent from "../static/HeaderContent";
import {Link } from "react-router-dom"
import {CSVLink} from "react-csv"
import jsPDF from "jspdf";
import 'jspdf-autotable'
import SubHeader from "../static/SubHeader";


function Task() {
  const [equipements, setEquipements] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [etat, setEtat] = useState([]);
  const [taskData, setTaskData] = useState({});
  const [filterdata, setFilterdata]= useState([]);
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
  
  const addTask = () => {
    document.querySelector(".task-section .add-form").classList.add("showTaskForm");
    document.querySelector(".overly").style.display = "block";
  };
  
  // Hide form after submit data
  const exitForm = () => {
    document
      .querySelector(".task-section .add-form")
      .classList.remove("showTaskForm");
    document.querySelector(".overly").style.display = "none";
  };

  // Fetch all equipement data
  const getEqui = () => {
    axios
      .get(mainPath("equipement.php"))
      .then((response) => setEquipements(response.data));
  };

  // Fetch all tasks data
  const getTasks = () => {
    axios.get(mainPath("task.php")).then((response)=>{
      setTasks(response.data);
      setFilterdata(response.data);
    })
  };

  // Delete task
  const delTask = (id) => {
    axios.delete(mainPath("task.php", id, "delete"));
    getTasks();
  };

  // Fetch all etat data
  const getEtat = () => {
    axios.get(mainPath("etat.php")).then((response) => setEtat(response.data));
  };

  // Submit data to tache table
  const handleForm = (e) => {
    e.preventDefault();

    // Clear all inputs after submit
    e.target.reset();

    // Submit data to task table
    axios.post(mainPath("task.php"), taskData);

    getTasks()
    // Hide Form From page
    document .querySelector(".task-section .add-form") .classList.remove("showTaskForm")
    document.querySelector(".overly").style.display = "none"
  };

  // Export Data to pdf
  const pdfData = ()=>{
    const pdf = new jsPDF()
    pdf.autoTable({html:"#tasks"})
    pdf.save('tâches.pdf')
  }

  // Search data from table
  const handlesearch=(event)=>{
    const getSearch= event.target.value; 
    if(getSearch.length > 0)
    {     
     const searchdata= tasks.filter( (fl)=> fl.description.toLowerCase().includes(getSearch));
     setTasks(searchdata);
    } else {
      setTasks(filterdata);
    }
    setQuery(getSearch);
  }

  useEffect(() => {
    getEqui();
    getTasks();
    getEtat();
  },[]);

  return (
    <div className="task-section">
      <SubHeader />
      <HeaderContent title="liste des tâches" />
      <div className="box-content">
        <div className="box-header">
          <div className="btn-action" onClick={addTask}>
            Créer tâche
          </div>
        </div>
        <div className="box-body">
          <div className="filter-data">
            <div className="search-aera input-box">
              <input type="text" value={query} onChange={(e)=>handlesearch(e)} placeholder='Cherche ici...' />
            </div>
          </div>
          <div className="task-full-info">
            <span className="task-count"><i className="fa-solid fa-calendar-check icon-task"></i>{tasks.length} Tâches</span>
            <div className="task-actions">
              <CSVLink data ={tasks} filename="Données de tâches" className="btn-action csv-btn">Export CSV</CSVLink>
              <div className="btn-action pdf-btn" onClick={pdfData}>Export PDF</div>
            </div>
          </div>
          <table className="table-data" id="tasks">
            <thead className="table-row-data">
              <tr>
                <td>#id</td>
                <td>
                  <div className="title-details"><i className="fa-solid fa-calendar-check title-icon"></i>Task</div>
                </td>
                <td><div className="title-details">Equipement</div></td>
                <td>
                  <div className="title-details"><i className="fa-solid fa-battery-half title-icon"></i>Etat</div>
                </td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                return (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>
                      <div className="task-quick-info">
                        <ul>
                          <li><Link to="/task-details/10">{task.description}</Link></li>
                          <li><i className="fa-solid fa-clock title-icon"></i> {task.dure}</li>
                        </ul>
                      </div>
                    </td>
                    <td>{task.equipement_id}</td>
                    <td>{task.etat_id}</td>
                    <td>
                      <div className="actions">
                        <i className="fa-solid fa-trash-can icon-delete"></i>
                        <Link to={"/task-details/"+task.id}><i className="fa-solid fa-eye icon-edit"></i></Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="form-section">
        <div className="add-form">
          <div className="title"> Ajouter un tâche <i className="fa-solid fa-tags"></i></div>
          <div className="form-content">
            <form onSubmit={handleForm}>
              <div className="form-details">
                <div className="input-box">
                  <label className="details">Sélectionnez équipement</label>
                  <select onChange={(e) => setTaskData({...taskData,equipement_id: e.target.value})}>
                    <option>List d'équipement</option>
                    {
                      equipements.map((equip) => {
                        return (
                          <option key={equip.id} value={equip.id}>{equip.nom}</option>
                        )
                      })
                    }
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
  );
}

export default Task;
