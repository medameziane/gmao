import SuccessAction from "./SuccessAction"

function ConfirmDelete() {
  const cancel=()=>{
    document.querySelector(".confirm-delete").classList.remove("show")
    document.querySelector(".overly").style.display = "none"
  }
  const successDelete=()=>{
    document.querySelector(".success-remove .card-success").classList.add("showRemove")
    setTimeout(()=>{
      document.querySelector(".success-remove .card-success").classList.remove("showRemove")
    },3000)
  }

  return (
    <div className='confirm-delete'>
      <SuccessAction />
      <h2>Êtes-vous sûr de vouloir supprimer?</h2>
      <i className="fa-solid fa-triangle-exclamation"></i>
      <div className="delete-actions">
        <span className="confirm" onClick={successDelete}>Confirm</span>
        <span className="cancel" onClick={cancel}>Cancel</span>
      </div>
    </div>
  )
}

export default ConfirmDelete