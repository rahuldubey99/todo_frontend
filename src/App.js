import './App.css';
import LoginAndSignup from './component/LoginAndSignup';
import ListTodo from './component/ListTodo';
import { Link, Route, BrowserRouter } from 'react-router-dom';
import Logout from './component/Logout';


function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <Route exact path="/" component={ListTodo} />
        <Route exact path="/register" component={LoginAndSignup} />
        <Route exact path="/logout" component={Logout} />
      </BrowserRouter>
    </div>
  );
}

export default App;
