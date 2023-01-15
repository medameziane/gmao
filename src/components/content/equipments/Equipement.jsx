import './equipement.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
import HeaderContent from "../static/HeaderContent";
import SubHeader from "../static/SubHeader";
import { Link } from 'react-router-dom';


const addEquipement = ()=>{
  document.querySelector(".equipement-section .add-form").classList.add("showEquipementForm")
  document.querySelector(".overly").style.display = "block"
}

const exitForm = ()=>{
  document.querySelector(".equipement-section .add-form").classList.remove("showEquipementForm")
  document.querySelector(".overly").style.display = "none"
}

function Equipement() {
  const [categories, setCategories] = useState([])
  const [equipements, setEquipements] = useState([])
  const [data,setData]=useState({})

  // Fetch all data from categories table
  const getCat = () => {
    axios.get("http://localhost/gmao-react/backend/tables/categorie.php").then((response) =>
      setCategories(response.data)
    )
  }

  // Fetch all data from equipements table
  const getEquipements = () => {
    axios.get("http://localhost/gmao-react/backend/tables/equipement.php").then((response) =>
      setEquipements(response.data)
    )
  }  

  useEffect(()=>{
    getCat();
    getEquipements();
  }, []);

  const handleForm = (e)=>{
    e.preventDefault()

    // Clear all inputs form
    e.target.reset()

    // Submit data to equipement table
    axios.post('http://localhost/gmao-react/backend/tables/equipement.php', data)

    // Hide Form From page
    document.querySelector(".equipement-section .add-form").classList.remove("showEquipementForm")
    document.querySelector(".overly").style.display = "none"
  }

  return (
    <div className="equipement-section">
      <SubHeader />
      <HeaderContent title = "List d'Équipement"/>
      <div className="equipement-content">
        <div className="box-content">
          <div className="box-header">
            <div className="add-equipement btn-action" onClick={addEquipement}>Créer Équipement</div>
          </div>
          <div className="box-body">
            <div className="list-equipements">
              {
                equipements.map((equip)=>{
                  return (
                    <div className="equipment" key={equip.id}>
                      <Link to={"/equipement-details/"+equip.id} className="box-hero">
                        <img src='https://app.mobility-work.com/media/cache/resolve/large/images//fake_dataimg/defaultData/compresseur.jpg' className="box-image"/>
                        <h3 className="box-title">{equip.nom}</h3>
                      </Link>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      <div className="form-section">
        <div className="add-form">
          <div className="title">Ajouter un équipement <i className="fa-solid fa-tags"></i></div>
          <div className="form-content">
            <form onSubmit={handleForm}>
              <div className="form-details">
                <div className="input-box">
                  <label htmlFor="name" className="details">Nom</label>
                  <input type="text" placeholder="Nom" id="name" onChange={(e)=>setData({...data,'name': e.target.value})} required/>
                </div>
                <div className="input-box">
                  <label htmlFor="description" className="details">Description</label>
                  <textarea placeholder="Description..." id="description" onChange={(e)=>setData({...data,'description': e.target.value})} required></textarea>
                </div>
                <div className="input-box">
                  <label htmlFor="category" className="details">Catégorie</label>
                  <select id="category" onChange={(e)=>setData({...data,'categorie_id': e.target.value})} required>
                    <option defaultChecked>Select Catégorie</option>
                    {categories.map((cat)=>{
                      return (
                        <option value={cat.id} key={cat.id}>{cat.categorie}</option>
                      )
                    })
                    }
                  </select>
                </div>
                <div className="input-box">
                  <label htmlFor="price" className="details">Prix</label>
                  <input type="number" placeholder="Prix" id="price" onChange={(e)=>setData({...data,'prix': e.target.value})} required/>
                </div>
                <div className="input-box">
                  <label htmlFor="marque" className="details">Marque</label>
                  <input type="text" placeholder="Marque" id="marque" onChange={(e)=>setData({...data,'marque': e.target.value})} required/>
                </div>
                <div className="input-box">
                  <label htmlFor="reference" className="details">Reference</label>
                  <input type="text" placeholder="Reference" id="reference" onChange={(e)=>setData({...data,'reference': e.target.value})} required/>
                </div>
                <div className="input-box">
                  <label htmlFor="piecedeRechange" className="details">PiecedeRechange ?</label>
                  <input type="text" placeholder="piecedeRechange" id="piecedeRechange" onChange={(e)=>setData({...data,'piecedeRechange': e.target.value})} required/>
                </div>
                <div className="input-box">
                  <label htmlFor="document" className="details">Document</label>
                  <input type="text" placeholder="document" id="document" onChange={(e)=>setData({...data,'document': e.target.value})} required/>
                </div>
                <div className="input-box">
                  <label className="details">Service</label>
                  <select onChange={(e)=>setData({...data,'service_id': e.target.value})} required>
                    <option>Selection Category</option>
                    <option>Label 1</option>
                    <option>Label 2</option>
                    <option>Label 3</option>
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

export default Equipement