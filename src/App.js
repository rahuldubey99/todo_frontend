import './App.css';
import LoginAndSignup from './component/LoginAndSignup';
import ListTodo from './component/ListTodo';
import { Link, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/list" >List</Link>

        <Link to="/register" >register</Link>
        {/* <LoginAndSignup /> */}

        <Route exact path="/list" component={ListTodo} />
        {/* <Route exact path="/register" component={LoginAndSignup} /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
