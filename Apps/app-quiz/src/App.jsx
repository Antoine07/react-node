import './App.css';
import { employees } from './data/employee';
import Employee from './components/Employee';

function App() {

  return (
    <>
      <p>Employees</p>

      <div>
          {employees.map(e => <Employee name={e.name} role={e.role} salary={e.salary} /> )}
        </div>
    </>
  )
}

export default App
