import React from 'react'
import { Link } from 'react-router-dom'
import './equipement.css'

function EquipementDetails() {
  return (
    <div className='equipement-details-section'>
      <div className="box-content">
        <div className="box-header">
          <div className="equipement-actions">
            <div className="btn-action">Ajouter une tâche</div>
            <div className="btn-action btn-edit">Modifier l'équipement</div>
            <div className="btn-action btn-delete">Supprimer l'équipement</div>
          </div>
        </div>
        <div className="box-body">
          <div className="details-items">
            <div className='items'>
              <div className="item-image">
                <img src='https://app.mobility-work.com/media/cache/resolve/large/images//fake_dataimg/defaultData/compresseur.jpg'/>
              </div>  
              <div className="info-details">
                <span className="equi-item-title">Lorem ipsum dolor sit amet consectetur</span>
                <div className="item-info-description">
                  <h3 className='item-title'><i className="fa-solid fa-align-left"></i>Description</h3>
                  <span className="item-data">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, ducimus maiores? Harum cum tempore reiciendis.</span>
                </div>
                <div className="info-items">
                  <div className="item-info">
                    <h3 className='item-title'><i className="fa-solid fa-tag"></i>Catégorie</h3>
                    <span className="item-data">Electronique</span>
                  </div>
                  <div className="item-info">
                    <h3 className='item-title'><i className="fa-solid fa-eye"></i>Visibility</h3>
                    <span className="item-data">Public</span>
                  </div>
                  <div className="item-info">
                    <h3 className='item-title'>Reference</h3>
                    <span className="item-data">Lorem, ipsum.</span>
                  </div>
                  <div className="item-info">
                    <h3 className='item-title'>Marque</h3>
                    <span className="item-data">Machine</span>
                  </div>
                  <div className="item-info">
                    <h3 className='item-title'><i className="fa-solid fa-money-bill"></i>Prix</h3>
                    <span className="item-data">550</span>
                  </div>
                </div>
              </div>   
            </div>
          </div>
          <div className="equipement-additional">
            <div className="equipement-tasks">
              <Link to={"/task-details/"+2}>
                <div className="equip-task">
                  <div className="equip-task-icon"><i className="fa-solid fa-calendar-days"></i></div>
                  <div className="equip-task-info">
                    <div className="task-info-date">20/10/2021</div>
                    <p className="task-info-des">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus nulla aperiam odit nobis eaque, dolorem labore maxime voluptas repellendus exercitationem?</p>
                    <div className="task-info-etat">Pending</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EquipementDetails
