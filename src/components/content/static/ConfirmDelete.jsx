function ConfirmDelete() {
  const cancel=()=>{
    document.querySelector(".confirm-delete").classList.remove("show")
    document.querySelector(".overly").style.display = "none"
  }
  return (
    <div className='confirm-delete'>
      <h2>Êtes-vous sûr de vouloir supprimer?</h2>
      <i className="fa-solid fa-triangle-exclamation"></i>
      <div className="delete-actions">
        <span className="confirm">Confirm</span>
        <span className="cancel" onClick={cancel}>Cancel</span>
      </div>
    </div>
  )
}

export default ConfirmDelete