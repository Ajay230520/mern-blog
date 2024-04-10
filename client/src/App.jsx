import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Projects from "./pages/Projects";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute copy";
import CreatePost from "./pages/CreatePost";
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage.jsx";
import { ScrollToTop } from "./components/ScrollToTop.jsx";
import Search from "./pages/Search.jsx";
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Home />}></Route>
        <Route
          path="/about"
          element={<About />}></Route>
        <Route
          path="/signin"
          element={<SignIn />}></Route>
        <Route
          path="/signup"
          element={<SignUp />}></Route>
        <Route
          path="/search"
          element={<Search />}></Route>
        <Route element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route
            path="/create-post"
            element={<CreatePost />}></Route>
          <Route
            path="/update-post/:postId"
            element={<UpdatePost />}></Route>
        </Route>
        <Route
          path="/projects"
          element={<Projects />}></Route>
        <Route
          path="/post/:postSlug"
          element={<PostPage />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
