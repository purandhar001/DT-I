import SignUp from './SignUp'
import '../firebase' 
import "bootstrap/dist/css/bootstrap.min.css"
import { Container } from 'react-bootstrap'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashBoard from './DashBoard'
import SignIn from './SingIn'
function App() {
  return (
    <>
      <Container className='d-flex align-items-center justify-content-center' style={{height: '100vh'}}>
        <div className='w-100' style={{maxWidth: '400px'}}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/CourseConnect/" element={<DashBoard />} />
                <Route path="/CourseConnect/signup" element={<SignUp />} />
                <Route path="/CourseConnect/signin" element={<SignIn />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </>
  )
}

export default App;
