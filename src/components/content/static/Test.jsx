import React, { Component } from 'react'

class Test extends Component{
  mainPath = (page, id, action) => {
    if (page && id && action) {
      return "http://localhost/gmao-react/backend/tables/" +page +"/" +id +"/" +action
    } else if (page && id) {
      return "http://localhost/gmao-react/backend/tables/" + page + "/" + id;
    } else {
      return "http://localhost/gmao-react/backend/tables/" + page;
    }
  };
  cancel=()=>{
    document.querySelector(".confirm-delete").classList.remove("show")
    document.querySelector(".overly").style.display = "none"
    console.log("test")
    return <h1>Hello</h1>
  }

  // const handleDelete = (id)=>{
  //   document.querySelector(".confirm-delete").classList.add("show")
  //   document.querySelector(".overly").style.display = "block"
  //   document.querySelector(".delete-actions .confirm").addEventListener(("click"),()=>{
  //     axios.delete((mainPath("technicien.php",id)))
  //     document.querySelector(".confirm-delete").classList.remove("show")
  //     document.querySelector(".overly").style.display = "none"
  //   })
  // }
  render() {
    return (
      <div className='delete'>
        <h1>{Test.cancel}</h1>
      </div>
    )
  }
}
export default Test