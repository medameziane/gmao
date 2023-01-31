import { BrowserRouter, Route, Routes} from 'react-router-dom'

import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'
import Dash from './content/dashboard/Dash'
import Task from './content/tasks/Task'
import Activity from './content/activities/Activity'
import Technician from './content/technician/Technician'
import TaskUpdate from './content/tasks/TaskUpdate'
import TaskDetails from './content/tasks/TaskDetails'
import Equipement from './content/equipments/Equipement'
import EquipementDetails from './content/equipments/EquipementDetails'
import TechnicianDetails from './content/technician/TechnicianDetails'
import Calendar from './content/calendar/Calendar'

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
              <Route path="/equipement-details/:id" element={<EquipementDetails />} />

              <Route path="/task" element={<Task />} />
              <Route path="/task-update" element={<TaskUpdate />} />
              <Route path="/task-details/:id" element={<TaskDetails />} />

              <Route path="/activity" element={<Activity />} />

              <Route path="/technician" element={<Technician />} />
              <Route path="/tech-details/:id" element={<TechnicianDetails />} />

              <Route path="/calendar" element={<Calendar />} />

            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default RoutePath

