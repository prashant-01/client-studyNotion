import './App.css'
import { Route, Routes } from "react-router-dom";
import { useSelector } from 'react-redux';
import HomePage from "./pages/HomePage";
import Navbar from './components/common/Navbar';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ResetPassword from './pages/ResetPassword';
import NotFound from './pages/NotFound';
import OpenRoute from './components/core/Auth/OpenRoute';
import VerifyEmail from './pages/VerifyEmail';
import UpdatePassword from './pages/UpdatePassword';
import MyProfile from './components/core/Dashboard/MyProfile';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Settings from './components/core/Dashboard/Settings';
import EnrolledCourses from './components/core/Dashboard/EnrolledCourses';
import Cart from './components/core/Dashboard/Cart/Cart';
import MyCourses from './components/core/Dashboard/Instructor/MyCourses';
import AddCourse from './components/core/Dashboard/Add Course/AddCourse';
import EditCourse from './components/core/Dashboard/Edit Course/EditCourse';
import Catalog from './pages/Catalog';
import CourseDetails from './pages/CourseDetails';
import ViewCourse from './pages/ViewCourse';
import VideoDetails from './components/core/ViewCourse/VideoDetails';
import InstructorDashboard from './components/core/Dashboard/Instructor/InstructorDashboard';
function App() {
  const { user } = useSelector( (state) => state.profile )
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
      {/* normal routes */}
        <Route path='/' element={ <HomePage /> }/>
        <Route path='/catalog/:catalogName' element={ <Catalog /> }/>
        <Route path='/courses/:courseId' element={ <CourseDetails /> }/>

        {/* open routes */}
        <Route path='/login' element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        } />
        <Route path='/signup' element={
          <OpenRoute>
            <Signup />
          </OpenRoute>
        } />
        <Route path='/about' element={ <AboutUs /> } />
        <Route path='/contact' element={ <ContactUs /> } />
        <Route path='/reset-password' element={ 
          <OpenRoute>
            <ResetPassword />
          </OpenRoute>
        } />
        <Route path='/update-password/:token' element={ 
          <OpenRoute>
            <UpdatePassword />
          </OpenRoute>
        } />
        <Route path='/verify-email' element={ 
          <OpenRoute>
            <VerifyEmail />
          </OpenRoute>
        } />

        {/* OutLet rendering */}
        <Route element={ 
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute> 
        }>
          <Route path='/dashboard/my-profile' element={ <MyProfile /> } />
          <Route path='/dashboard/settings' element={ <Settings /> } />
          {
            user && user.accountType === "Student" && (
              <>
                <Route path='/dashboard/enrolled-courses' element={ <EnrolledCourses /> } />
                <Route path='/dashboard/cart' element={ <Cart /> } />
              </>
            )
          }
          {
            user && user.accountType === "Instructor" && (
              <>
              <Route path='/dashboard/instructor' element={ <InstructorDashboard/> } />
                <Route path='/dashboard/my-courses' element={ <MyCourses/> } />
                <Route path='/dashboard/add-course' element={ <AddCourse/> } />
                <Route path='/dashboard/edit-course/:courseId' element={ <EditCourse/> } />
              </>
            )
          }
        </Route>
        
          <Route element={
            <PrivateRoute>
              <ViewCourse/>
            </PrivateRoute>
          }>
            {
              user && user.accountType === "Student" && (
                <Route path='/view-course/:courseId/section/:sectionId/subSection/:subSectionId' element={ <VideoDetails/> }/>
              )
            }
          </Route>

        <Route path='*' element={ <NotFound/> } />
      </Routes>
    </div>
  );
}

export default App;
