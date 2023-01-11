import { BrowserRouter, Route, Routes} from 'react-router-dom'

import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'
import Dash from './content/dashboard/Dash'
import Equipement from './content/equipments/Equipement'
import Task from './content/tasks/Task'

function RoutePath() {
  return (
    <>
      <BrowserRouter>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='container'>
          <Header />
          <div className='content-wrapper'>
            <Routes>
              <Route path="/" element={<Dash />} />
              <Route path="/equipment" element={<Equipement />} />
              <Route path="/task" element={<Task />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default RoutePath

