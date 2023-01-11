import './static.css'

let localDate = new Date();
let getDay = localDate.getDate() 
let getMonth = localDate.getMonth()
let getYears = localDate.getFullYear()

if(localDate.getDate()<10){
 getDay =  "0"+localDate.getDate() 
}
if(localDate.getMonth()<10){
  getMonth =  "0"+(localDate.getMonth() +1)
}

function HeaderContent(props) {
  return (
    <div className="header-content">
      <h2 className='title-content'>{props.title}</h2>
      <div className="date-area">
        <input type='date'defaultValue={getYears+"-"+getMonth+"-"+getDay} />
      </div>
    </div>
  )
}

export default HeaderContent