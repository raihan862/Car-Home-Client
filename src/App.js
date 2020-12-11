import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UpdateCarInfo from './Components/UpdateCarInfo/UpdateCarInfo';
import CarDetails from './Components/CarDetails/CarDetails';
 

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    
    <Switch>
      <Route exact path='/'>
      <Home></Home>
      </Route>
      <Route exact path='/carDetails'>
      <CarDetails></CarDetails>
      </Route>
      <Route path='/updateCarInfo'>
        <UpdateCarInfo></UpdateCarInfo>
      </Route>
    </Switch>
    </BrowserRouter>
    
     
    </div>
  );
}

export default App;
