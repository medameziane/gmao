import './technician.css'
import axios from "axios";
import React, { useEffect} from "react";
import {CSVLink} from "react-csv"
import jsPDF from "jspdf";
import 'jspdf-autotable'
import { Link } from 'react-router-dom';
import HeaderContent from "../static/HeaderContent";
import AddTechnicien from './AddTechnicien';
import ConfirmDelete from '../static/ConfirmDelete';
import SuccessAction from '../static/SuccessAction';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTech, getTech } from './techSlice';

function Technician() {
  const techniciens = useSelector(state => state.technicien)
  const dispatch =  useDispatch()

  const pdfData = ()=>{
    const pdf = new jsPDF()
    pdf.autoTable({html:"#techniciens"})
    pdf.save('techniciens.pdf')
  }

  const handleDelete = (id)=>{
    document.querySelector(".confirm-delete").classList.add("show")
    document.querySelector(".overly").style.display = "block"
    document.querySelector(".delete-actions .confirm").addEventListener(("click"),()=>{
      dispatch(deleteTech(id))
      document.querySelector(".confirm-delete").classList.remove("show")
      document.querySelector(".success-action .success-remove .card-success").classList.add("showRemove")
      setTimeout(()=>{
        document.querySelector(".success-action .success-remove .card-success").classList.remove("showRemove")
      },3000)
      document.querySelector(".overly").style.display = "none"
    })
  }

  const addTech = () => {
    document.querySelector(".add-task .add-form").classList.add("showTaskForm");
    document.querySelector(".overly").style.display = "block";
  };

  useEffect(() => {
    dispatch(getTech())
  },[techniciens]);

  const loopData = techniciens.map(tech=>{
    return (
      <tr key={tech.id}>
        <td><Link to={"/tech-details/"+tech.id}>{tech.nom+" "+tech.prenom}</Link></td>
        <td>{tech.email}</td>
        <td>{tech.specialite}</td>
        <td>
          <div className="actions">
            <i className="fa-solid fa-trash-can icon-delete" onClick={()=>{handleDelete(tech.id)}}></i>
            <Link to={"/tech-details/"+tech.id}><i className="fa-solid fa-eye icon-edit"></i></Link>
          </div>
        </td>
      </tr>
    )
  })

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
            <tbody>{loopData}</tbody>
          </table>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Technician