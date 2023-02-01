import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SuccessAction from '../static/SuccessAction'

function AddEquipement() {
  const [categories, setCategories] = useState([])
  const [service, setService] = useState([])
  const [equipementData,setEquipementData]=useState({})
  const [categorieData,setCategorieData]=useState({})
  const [handleError,setHandleError]=useState({})
  const [inputEtat, setInputEtat] = useState(false)
  const formData = new FormData();

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
    axios.get(mainPath("categorie.php")).then(res =>setCategories(res.data))
    axios.get(mainPath("service.php")).then((res) =>setService(res.data))
  }

  const showHideInput = ()=>{
    document.querySelector(".hide-input").classList.toggle("showHideInput")
  }

  const handleImage = (e)=>{
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const acceptedTypes = ["image/jpeg", "image/png"];
    if (acceptedTypes.indexOf(file.type) === -1) {
      setHandleError({...handleError , "image" : "Invalid file type. Only JPEG, PNG files are allowed."})
      e.target.value=""
    }else{
      setEquipementData({...equipementData , imageData : file.name})
      setHandleError({...handleError , "image" : ""})
      formData.append("picture", file);
    }
  }

  const handleDocument = (e)=>{
    const fileInput = document.getElementById("document");
    const file = fileInput.files[0];
    const acceptedTypes = ["application/pdf","application/docx"];
    if (acceptedTypes.indexOf(file.type) === -1) {
      setHandleError({...handleError , "document" : "Invalid file type. Only PDF, DOCX files are allowed."})
      e.target.value=""
    }else{
      setEquipementData({...equipementData , document : file.name})
      setHandleError({...handleError , "document" : ""})
      formData.append("document", file);
    }
  }

  const exitForm = ()=>{
    document.querySelector(".equipement-section .add-form").classList.remove("showEquipementForm")
    document.querySelector(".overly").style.display = "none"
  }

  const handleChange = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setEquipementData(values => ({...values , [name] : value}))
  }

  const submitCategorie = ()=>{
    if(categorieData.categorie){
      axios.post(mainPath("categorie.php"),categorieData)
      document.querySelector(".hide-input").classList.toggle("showHideInput")
      setCategorieData('')
      setInputEtat(true)
    }
  }

  const handleForm = (e)=>{
    e.preventDefault()
    handleImage()
    handleDocument()
    axios.post(mainPath("equipement.php"),formData)
    axios.post(mainPath("equipement.php"),equipementData)
    document.querySelector(".equipement-section .add-form").classList.remove("showEquipementForm")
    document.querySelector(".overly").style.display = "none"
    document.querySelector(".add-equipement .success-equip .card-success").classList.add("showEquip")
    setTimeout(()=>{
      document.querySelector(".add-equipement .success-equip .card-success").classList.remove("showEquip")
    },3000)
    e.target.reset()
  }
  
  useEffect(()=>{
    getAllData();
  },[categories])

  return (
    <div className='add-equipement'>
      <SuccessAction />
      <div className="form-section">
        <div className="add-form">
          <div className="title">Ajouter un équipement <i className="fa-solid fa-xmark" onClick={exitForm}></i></div>
          <div className="form-content">
            <form onSubmit={handleForm}>
              <div className="form-details">
                <div className="input-box">
                  <p>Est-ce que cette équipement est une pièce de rechange ?</p>
                  <div className="radio-box">
                    <div className="radio">
                      <input type="radio" name='piecedeRechange' id="true" value="1" onChange={handleChange}/>
                      <label className="details" htmlFor="true">Oui</label>
                    </div>
                    <div className="radio">
                      <input type="radio" id='false' name='piecedeRechange' value="0" defaultChecked onChange={handleChange}/>
                      <label className="details" htmlFor="false">Non</label>
                    </div>
                  </div>
                </div>
                <div className="input-box">
                  <label htmlFor="fileInput" className="details">Photo d'équipement</label>
                  <input type="file" id="fileInput" onChange={handleImage} required/>
                  <span className="input-error">{handleError.image}</span>
                </div>
                <div className="input-box">
                  <label htmlFor="name" className="details">Nom</label>
                  <input type="text" placeholder="Nom" id="name" name='nom' onChange={handleChange} required/>
                </div>
                <div className="input-box">
                  <label htmlFor="reference" className="details">Reference</label>
                  <input type="text" placeholder="Reference" id="reference" name='reference' onChange={handleChange} required/>
                </div>
                <div className="input-box">
                  <label htmlFor="description" className="details">Description</label>
                  <textarea placeholder="Description..." id="description" name='description' onChange={handleChange} required></textarea>
                </div>
                <div className="input-box">
                  <label className="details">Catégorie</label>
                  <div className="sub-input">
                    <select name='categorie_id' onChange={handleChange} required>
                      <option value="" disabled selected>Select Catégorie</option>
                      {categories.map((cat)=>{
                        return (
                          <option value={cat.id} key={cat.id}>{cat.categorie}</option>
                          )
                        })
                      }
                    </select>
                    <span className='btn-select-hidden' onClick={showHideInput}>Autre</span>
                  </div>
                  <div className="sub-input">
                    <div className="hide-input">
                      <input type="text" className='hide-categorie' disabled = {inputEtat} placeholder="Catégorie" onChange={(e)=>{setCategorieData({...categorieData , 'categorie' : e.target.value})}}/>
                      <span className='btn-action' onClick={submitCategorie}>Confirm</span>
                    </div>
                  </div>
                </div>
                <div className="input-box">
                  <label htmlFor="price" className="details">Prix</label>
                  <input type="number" placeholder="Prix" id="price" name="prix" onChange={handleChange} required/>
                </div>
                <div className="input-box">
                  <label htmlFor="marque" className="details">Marque</label>
                  <input type="text" placeholder="Marque" id="marque" name='marque' onChange={handleChange} required/>
                </div>
                <div className="input-box">
                  <label htmlFor="document" className="details">Document</label>
                  <input type="file" id="document" onChange={handleDocument} required/>
                  <span className="input-error">{handleError.document}</span>
                </div>
                <div className="input-box">
                  <label className="details">Service</label>
                  <select name='service_id' onChange={handleChange} required>
                    <option value="" disabled selected>Selection Service</option>
                    {
                      service.map(ser=>{
                        return (
                          <option key={ser.id} value={ser.id}>{ser.nomService}</option>
                        )
                      })
                    }
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

export default AddEquipement