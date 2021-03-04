import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router";
import LoginPage from '../login-page/login-page';
import UsersPage from '../users-page/users-page';

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Switch>
          <Route
            path='/'
            exact
            component={LoginPage}
          />
          <Route
            path='/users'
            component={UsersPage}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
