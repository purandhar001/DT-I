import SignUp from './SignUp'; 
import '../firebase'; 
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashBoard from './DashBoard';
import SignIn from './SignIn';
import Routine from './Routine';  
import PrivateRoute from './PrivateRoute';
import Layout from './Layout';  
import Courses from './Courses';
import Network from './Network';
import CareerPath from './career-selection/CareerPath';
import Chatbot from './Chatbot';
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="/CourseConnect/" element={<Layout><DashBoard /></Layout>} />
            </Route>

            <Route path="/CourseConnect/careerpath" element={<CareerPath />} />
            <Route path="/CourseConnect/routine" element={<Layout><Routine /></Layout>} />
            <Route path="/CourseConnect/courses" element={<Layout><Courses /></Layout>} />
            <Route path="/CourseConnect/network" element={<Layout><Network /></Layout>} />
            <Route path="/CourseConnect/chatbot" element={<Layout><Chatbot /></Layout>} />
            <Route path="/CourseConnect/signup" element={<SignUp />} />
            <Route path="/CourseConnect/signin" element={<SignIn />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
