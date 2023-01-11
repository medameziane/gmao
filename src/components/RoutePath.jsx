import { BrowserRouter, Route, Routes} from 'react-router-dom'

import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'
import Dash from './content/dashboard/Dash'
import Equipement from './content/equipments/Equipement'
import Task from './content/tasks/Task'
import Activity from './content/activities/Activity'
import Technician from './content/technician/Technician'

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
              <Route path="/activity" element={<Activity />} />
              <Route path="/technician" element={<Technician />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default RoutePath

