import './technician.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderContent from "../static/HeaderContent";
import {CSVLink} from "react-csv"
import jsPDF from "jspdf";
import 'jspdf-autotable'
import { Link } from 'react-router-dom';
import AddTechnicien from './AddTechnicien';
import ConfirmDelete from '../static/ConfirmDelete';
import SuccessAction from '../static/SuccessAction';

function Technician() {
  const [techniciens, setTechniciens] = useState([]);
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

  const getAllData = () => {
    axios.get(mainPath("technicien.php")).then(res=>setTechniciens(res.data))
    axios.get(mainPath("specialite.php")).then(res=> setSpecialites(res.data))
  };

  // Export Data to pdf
  const pdfData = ()=>{
    const pdf = new jsPDF()
    pdf.autoTable({html:"#techniciens"})
    pdf.save('techniciens.pdf')
  }


  const handleDelete = (id)=>{
    document.querySelector(".confirm-delete").classList.add("show")
    document.querySelector(".overly").style.display = "block"
    document.querySelector(".delete-actions .confirm").addEventListener(("click"),()=>{
      axios.delete((mainPath("technicien.php",id)))
      document.querySelector(".confirm-delete").classList.remove("show")
      document.querySelector(".success-action .success-remove .card-success").classList.add("showRemove")
      setTimeout(()=>{
        document.querySelector(".success-action .success-remove .card-success").classList.remove("showRemove")
        getAllData()
      },3000)
      document.querySelector(".overly").style.display = "none"
    })
  }

  const addTech = () => {
    document.querySelector(".add-task .add-form").classList.add("showTaskForm");
    document.querySelector(".overly").style.display = "block";
  };

  useEffect(() => {
    getAllData()
  },[]);

  return (
    <div className="technician-section">
      <HeaderContent title = "liste des Techniciens"/>
      <AddTechnicien />
      <ConfirmDelete />
      <SuccessAction />
      <div className="technician-content">
        <div className="box-content">
          <div className="box-header">
            <div className="btn-action" onClick={addTech}>Ajouter un téchnicien</div>
          </div>
          <div className="box-body">
          <div className="task-full-info">
            <span className="task-count"><i className="fa-solid fa-users icon-task"></i>{techniciens.length} Téchnicien(s)</span>
            <div className="task-actions">
              <CSVLink data ={techniciens} filename="Données de tâches" className="btn-action csv-btn">Export CSV</CSVLink>
              <div className="btn-action pdf-btn" onClick={pdfData}>Export PDF</div>
            </div>
          </div>
          <table className="table-data" id="techniciens">
            <thead className="table-row-data">
              <tr>
                <td><div className="title-details">Téchniciens</div></td>
                <td><div className="title-details">Email</div></td>
                <td><div className="title-details">Spécialité</div></td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {
                techniciens.map((tech) => {
                  return (
                    <tr key={tech.id}>
                      <td>
                        <div className="task-quick-info">
                          <ul>
                            <li><Link to={"/tech-details/"+tech.id}>{tech.nom+" "+tech.prenom}</Link></li>
                          </ul>
                        </div>
                      </td>
                      <td>{tech.email}</td>
                      <td>{
                        specialites.map(sp=>{
                          if(tech.specialite_id === sp.id){
                            return sp.specialite
                          }
                        })
                      }</td>
                      <td>
                        <div className="actions">
                          <i className="fa-solid fa-trash-can icon-delete" onClick={()=>{handleDelete(tech.id)}}></i>
                          <Link to={"/tech-details/"+tech.id}><i className="fa-solid fa-eye icon-edit"></i></Link>
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
    </div>
  )
}

export default Technician