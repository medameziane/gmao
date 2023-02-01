import "./task.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderContent from "../static/HeaderContent";
import ConfirmDelete from "../static/ConfirmDelete";
import {Link, useNavigate } from "react-router-dom"
import {CSVLink} from "react-csv"
import jsPDF from "jspdf";
import 'jspdf-autotable'
import AddTask from "./AddTask";

function Task() {
  const navigate = useNavigate()
  const [equipements, setEquipements] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [etat, setEtat] = useState([]);
  
  const mainPath = (page, id, action) => {
    if (page && id && action) {
      return "http://localhost/gmao-react/backend/tables/" +page +"/" +id +"/" +action
    } else if (page && id) {
      return "http://localhost/gmao-react/backend/tables/" + page + "/" + id;
    } else {
      return "http://localhost/gmao-react/backend/tables/" + page;
    }
  };

  const getAllData = () => {
    axios.get(mainPath("task.php")).then(res=>setTasks(res.data))
    axios.get(mainPath("equipement.php")).then(res=>setEquipements(res.data))
    axios.get(mainPath("etat.php")).then(res => setEtat(res.data));
  };

  // Export Data to pdf
  const pdfData = ()=>{
    const pdf = new jsPDF()
    pdf.autoTable({html:"#tasks"})
    pdf.save('tâches.pdf')
  }

  const delTask=(id)=>{
    document.querySelector(".confirm-delete").classList.add("show")
    document.querySelector(".overly").style.display = "block"
    document.querySelector(".delete-actions .confirm").addEventListener(("click"),()=>{
      axios.delete((mainPath("task.php",id)))
      document.querySelector(".confirm-delete").classList.remove("show")
      document.querySelector(".success-action .success-remove .card-success").classList.add("showRemove")
      setTimeout(()=>{
        document.querySelector(".success-action .success-remove .card-success").classList.remove("showRemove")
        getAllData()
      },3000)
      document.querySelector(".overly").style.display = "none"
    })
      getAllData()
  }

  const addTask = () => {
    document.querySelector(".add-task .add-form").classList.add("showTaskForm");
    document.querySelector(".overly").style.display = "block";
  };

  useEffect(() => {
    getAllData();
  },[tasks]);

  return (
    <div className="task-section">
      <HeaderContent title="liste des tâches" />
      <AddTask />
      <ConfirmDelete />
      <div className="box-content">
        <div className="box-header">
          <span className="btn-action" onClick={addTask}> Créer tâche</span>
        </div>
        <div className="box-body">
          <div className="task-full-info">
            <span className="task-count"><i className="fa-solid fa-calendar-check icon-task"></i>{tasks.length} Tâche(s)</span>
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
                  <div className="title-details">Etat</div>
                </td>
                <td style={{width:"10%"}}>Actions</td>
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
                            <li><i className="fa-solid fa-clock title-icon"></i> {task.dure} Jours</li>
                          </ul>
                        </div>
                      </td>
                      <td>{equipements.map(equip=>{
                          return equip.id === task.equipement_id ? <Link to={"/equipement-details/"+equip.id} className="task-equip" key={equip.id}>
                            <img src={"http://localhost/gmao-react/backend/images/"+equip.equip_image} alt={equip.nom} title={equip.nom}/>
                            <div className="task-equip-title">{equip.nom}</div>
                          </Link> : ""
                        })
                      }</td>
                      <td style={{"textAlign":"center",width:"15%"}}>{etat.map(et=>{
                        if(et.id === task.etat_id){
                          switch (et.etat){
                            case "En cours":
                              return (
                              <>
                                <i key={et.id} className="fa-solid fa-hourglass-half" style={{"color" : et.couleur}}></i>
                                <p className="etat">{et.etat}</p>
                              </>
                              )
                            case "Terminée":
                              return (
                              <>
                                <i key={et.id} className="fa-solid fa-circle-check" style={{"color" : et.couleur}}></i>
                                <p className="etat">{et.etat}</p>
                              </>
                              )
                            case "En retard":
                              return (
                              <>
                                <i key={et.id} className="fa-solid fa-circle-exclamation" style={{"color" : et.couleur}}></i>
                                <p className="etat">{et.etat}</p>
                              </>
                              )
                          }
                        }
                      })}
                      </td>
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
    </div>
  );
}

export default Task;
