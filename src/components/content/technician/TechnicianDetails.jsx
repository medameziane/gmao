import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function TechnicianDetails() {
  const {id} = useParams()
  const [technicien, setTechnicien] = useState([]);
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
    axios.get(mainPath("technicien.php",id)).then((response) => setTechnicien(response.data));
  };

  useEffect(() => {
    getAllData()
  });
  console.log(technicien)
  return (
    <div className='tech-details'>
      
    </div>
  )
}

export default TechnicianDetails
