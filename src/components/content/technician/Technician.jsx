import './technician.css'
import HeaderContent from "../static/HeaderContent";
import SubHeader from '../static/SubHeader';

function Technician() {
  return (
    <div className="technician-section">
      <SubHeader />
      <HeaderContent title = "liste des Technicians"/>
      <div className="technician-content">
        <div className="box-content">
          <div className="box-header">
            <div className="btn-action">Créer tâche</div>
          </div>
          <div className="box-body">
            <h1>Technicians</h1>
          </div>
        </div>
      </div>
      {/* <div className="form-section">
        <div className="add-form">
          <div className="title">Ajouter un tâche <i className="fa-solid fa-tags"></i></div>
          <div className="form-content">
            <form onSubmit={handleForm}>
              <div className="form-details">
                <div className="input-box">
                  <label htmlFor="titre" className="details">Titre</label>
                  <input type="text" placeholder="Titre" id="titre" onChange={(e)=>setTechnicianData({...technicianData,'titre': e.target.value})} required/>
                </div>
                <div className="input-box">
                  <label htmlFor="description" className="details">Description</label>
                  <textarea placeholder="Description de la tâche..." id="description" onChange={(e)=>setTechnicianData({...technicianData,'description': e.target.value})} required></textarea>
                </div>
                <div className="input-box">
                  <label htmlFor="dure" className="details">Durée</label>
                  <input type="text" placeholder="Durée" id="dure" onChange={(e)=>setTechnicianData({...technicianData,'dure': e.target.value})} required/>
                </div>
                <div className="input-box">
                  <label className="details">Sélectionnez votre équipement</label>
                  <select onChange={(e)=>setTechnicianData({...technicianData,'equipement_id': e.target.value})} required>
                    <option>List d'équipement</option>
                    {
                      equipements.map((equip)=>{
                        return (
                          <option key={equip.id} value={equip.id}>{equip.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className="input-box">
                  <label className="details">Spécifier l'état</label>
                  <select onChange={(e)=>setTechnicianData({...technicianData,'etat_id': e.target.value})} required>
                    <option>Spécifier l'état</option>
                    {
                      etat.map((et)=>{
                        return (
                          <option key={et.id} value={et.id}>{et.etat}</option>
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
      </div> */}
    </div>
  )
}

export default Technician