import "./task.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderContent from "../static/HeaderContent";
import {Link } from "react-router-dom"
import {CSVLink} from "react-csv"
import jsPDF from "jspdf";
import 'jspdf-autotable'
import SubHeader from "../static/SubHeader";
import AddTask from "./AddTask";

function Task() {
  const [equipements, setEquipements] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [etat, setEtat] = useState([]);

  const [filterdata, setFilterdata]= useState([]);
  
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

  // Get all data we need from table
  const getAllData = () => {
    // Fetch all tasks data
    axios.get(mainPath("task.php")).then(res=>setTasks(res.data))
    axios.get(mainPath("task.php")).then(res=>setFilterdata(res.data))
  };

  // Export Data to pdf
  const pdfData = ()=>{
    const pdf = new jsPDF()
    pdf.autoTable({html:"#tasks"})
    pdf.save('tâches.pdf')
  }

  // Search data from table
  const handlesearch=(event)=>{
    const getSearch = event.target.value;
    if(getSearch.length > 0){     
      const searchdata = tasks.filter(fl=> fl.description.toLowerCase().includes(getSearch));
      setTasks(searchdata);
    }else {
      setTasks(filterdata);
    }
  }

  // Delete task
  const delTask = (id) => {
    axios.delete(mainPath("task.php", id));
    getAllData();
  };

  const addTask = () => {
    document.querySelector(".add-task .add-form").classList.add("showTaskForm");
    document.querySelector(".overly").style.display = "block";
  };

  useEffect(() => {
    getAllData()
  },[]);

  return (
    <div className="task-section">
      <SubHeader />
      <HeaderContent title="liste des tâches" />
      <div className="box-content">
        <div className="box-header">
          <span className="btn-action" onClick={addTask}> Créer tâche</span>
        </div>
        <div className="box-body">
          <div className="filter-data">
            <div className="search-area input-box">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input type="text" onChange={(e)=>handlesearch(e)} placeholder='Cherche ici...' />
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
              {
                tasks.map((task) => {
                  return (
                    <tr key={task.id}>
                      <td>
                        <div className="task-quick-info">
                          <ul>
                            <li><Link to={"/task-details/"+task.id}>{task.description}</Link></li>
                            <li><i className="fa-solid fa-clock title-icon"></i> {task.dure}</li>
                          </ul>
                        </div>
                      </td>
                      <td>{task.equipement_id}</td>
                      <td>{task.etat_id}</td>
                      <td>
                        <div className="actions">
                          <i className="fa-solid fa-trash-can icon-delete" onClick={()=>{delTask(task.id)}}></i>
                          <Link to={"/task-details/"+task.id}><i className="fa-solid fa-eye icon-edit"></i></Link>
                        </div>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
      <AddTask />
    </div>
  );
}

export default Task;
