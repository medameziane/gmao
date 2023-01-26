import { Link, useNavigate} from 'react-router-dom'
import './static.css'

function HeaderRoutes() {
  const navigate = useNavigate();
  return (
    <div className='header-routes'>
      <span className='routes-content'><Link to="/">Dashboard</Link></span>
      <div className="go-back">
        <span className='btn-action' onClick={()=>navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i> Go back
        </span>
      </div>
    </div>
  )
}

export default HeaderRoutes
