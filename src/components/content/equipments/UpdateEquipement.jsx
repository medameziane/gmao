import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateEquipement() {
  const {id} = useParams()
  const navigate = useNavigate()

  const mainPath = (page, id, action) => {
    if (page && id && action) {
      return "http://localhost/gmao-react/backend/tables/" +page +"/" +id +"/" +action
    } else if (page && id) {
      return "http://localhost/gmao-react/backend/tables/" + page + "/" + id;
    } else {
      return "http://localhost/gmao-react/backend/tables/" + page;
    }
  };
  const [categories, setCategories] = useState([])
  const [service, setService] = useState([])
  const [equipement, setEquipement] = useState([])
  const [handleError,setHandleError]=useState({})
  const formData = new FormData();


  const getAllData = () => {
    axios.get(mainPath("categorie.php")).then(res =>setCategories(res.data))
    axios.get(mainPath("service.php")).then((res) =>setService(res.data))
    axios.get(mainPath("equipement.php",id)).then((res) =>setEquipement(res.data))
  }

  const handleImage = ()=>{
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    const acceptedTypes = ["image/jpeg", "image/png"];
    if (acceptedTypes.indexOf(file.type) === -1) {
      setHandleError({...handleError , "image" : "Invalid file type. Only JPEG, PNG files are allowed."})
    }else{
      setEquipement({...equipement , imageData : file.name})
      setHandleError({...handleError , "image" : ""})
      formData.append("picture", file);
    }
  }

  const showHideInput = ()=>{
    document.querySelector(".hide-categorie").classList.toggle("showHideCategoie")
  }

  const handleDocument = ()=>{
    const fileInput = document.getElementById("document");
    const file = fileInput.files[0];
    const acceptedTypes = ["application/pdf","application/docx"];
    if (acceptedTypes.indexOf(file.type) === -1) {
      setHandleError({...handleError , "document" : "Invalid file type. Only PDF, DOCX files are allowed."})
    }else{
      setEquipement({...equipement , document : file.name})
      setHandleError({...handleError , "document" : ""})
      formData.append("document", file);
    }
  }

  const exitForm = () => {
    document.querySelector(".update-equipement .add-form").classList.remove("showupdateform");
  }
  
  const handleChange = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setEquipement( values => ({...values , [name] : value}))
  }
  
  const handleForm = (e)=>{
    e.preventDefault()
    // handleImage()
    // handleDocument()
    // axios.put(mainPath("equipement.php",id),formData)
    axios.put(mainPath("equipement.php",id),equipement)
    document.querySelector(".update-equipement .add-form").classList.remove("showupdateform");
    navigate(`/equipement-details/${id}`)
    e.target.reset()
  }

  useEffect(()=>{
    getAllData();
  },[])

  return (
    <div className='update-equipement'>
      <div className="form-section">
        <div className="add-form">
          <div className="title">Mettre à jour l'équipement <i className="fa-solid fa-xmark" onClick={exitForm}></i></div>
          <div className="form-content">
            <form onSubmit={handleForm}>
              <div className="form-details">
                {/* <div className="input-box">
                  <label htmlFor="fileInput" className="details">Photo d'équipement</label>
                  <input type="file" id="fileInput" onChange={handleImage}/>
                  <span className="input-error">{handleError.image}</span>
                </div> */}
                <div className="input-box">
                  <label htmlFor="name" className="details">Nom</label>
                  <input type="text" id="name" defaultValue={equipement.nom} name='nom' onChange={handleChange}/>
                </div>
                <div className="input-box">
                  <label htmlFor="description" className="details">Description</label>
                  <textarea id="description" defaultValue={equipement.description} name = 'description' onChange={handleChange}></textarea>
                </div>
                <div className="input-box-items">
                  <div className="input-box">
                    <label htmlFor="category" className="details">Catégorie</label>
                    <div className="sub-input">
                      <select id="category" name='categorie_id' onChange={handleChange}>
                        {categories.map((cat)=>{
                          if(cat.id === equipement.categorie_id){
                            return <option value={cat.id} key={cat.id} selected>{cat.categorie}</option>
                          }
                            return <option value={cat.id} key={cat.id}>{cat.categorie}</option>
                          })
                        }
                      </select>
                      {/* <span className='btn-action' onClick={showHideInput}>Autre</span> */}
                    </div>
                    {/* <input type="text" className='hide-categorie'name = '' onChange={(e)=>setEquipement({...equipement,'categorie': e.target.value})}/> */}
                  </div>
                  <div className="input-box">
                    <label htmlFor="price" className="details">Prix</label>
                    <input type="number" id="price" defaultValue={equipement.prix} name = 'prix' onChange={handleChange}/>
                  </div>
                  <div className="input-box">
                    <label htmlFor="marque" className="details">Marque</label>
                    <input type="text" id="marque" defaultValue={equipement.marque} name = 'marque' onChange={handleChange}/>
                  </div>
                  <div className="input-box">
                    <label htmlFor="reference" className="details">Reference</label>
                    <input type="text" id="reference" defaultValue={equipement.reference} name = 'reference' onChange={handleChange}/>
                  </div>
                  {/* <div className="input-box">
                    <label htmlFor="piecedeRechange" className="details">PiecedeRechange ?</label>
                    <input type="text" id="piecedeRechange" name = '' onChange={(e)=>setEquipement({...equipement,'piecedeRechange': e.target.value})}/>
                  </div> */}
                  {/* <div className="input-box">
                    <label htmlFor="document" className="details">Document</label>
                    <input type="file" id="document" name = '' onChange={handleDocument}/>
                    <span className="input-error">{handleError.document}</span>
                  </div> */}
                  <div className="input-box">
                    <label className="details">Service</label>
                    <select name ='service_id' onChange={handleChange}>
                      {service.map(serv=>{
                        if(serv.id === equipement.service_id){
                          return <option value={serv.id} key={serv.id} selected>{serv.nomService}</option>
                        }
                          return <option value={serv.id} key={serv.id}>{serv.nomService}</option>
                        })
                      }
                    </select>
                  </div>              
                </div>
              </div>
              <div className="button">
                <input type="submit" value="Mettre à jour"/>
                <input type="button" onClick={exitForm} value="Fermer"/>
              </div>
            </form>
          </div>
        </div>
      </div>         
    </div>
  )
}

export default UpdateEquipement
