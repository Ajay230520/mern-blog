import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Projects from './pages/Projects';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
     <BrowserRouter>
     <Header />
     <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/signin" element={<SignIn/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route element={<PrivateRoute/>}> 
      <Route path="/dashboard" element={<Dashboard/>} />
      </Route>
      <Route path="/projects" element={<Projects/>}></Route>
     </Routes>
     <Footer/>
     </BrowserRouter>
  );
}

export default App
