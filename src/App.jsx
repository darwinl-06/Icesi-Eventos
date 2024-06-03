
import './index.css'
import EventsPage from './screens/EventsPage'
import LoginPage from './screens/LoginPage'
import MyEvents from './screens/MyEvents'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModifyPlan from './screens/ModifyPlan';
import Participants from './screens/Participants';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/MyEvents" element={<MyEvents/>} />
        <Route path="/Events" element={<EventsPage/>} />
        <Route path="/InfoPlanView/:id" element={<ModifyPlan/>} />
        <Route path="/Participants/:idEvent" element={<Participants/>} />
      </Routes>
    </Router>
  )
}

export default App
