import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Header from './Header';
import {BrowserRouter, Route} from 'react-router-dom'
import Bar from './Bar'
import Login from './Login'
import Home from './Home'
import MapRoute from './MapRoute'
import Announcement from './Announcement'
import AboutUs from './AboutUs'
import Profile from './Profile'
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Bar/>
        <Header/>
        <Route path="/home">
          <Home/>
        </Route>
        <Route path="/maproute">
          <MapRoute/>
        </Route>
        <Route path="/announcement">
          <Announcement/>
        </Route>
        <Route path="/aboutus">
          <AboutUs/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
