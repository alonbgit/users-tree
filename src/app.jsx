import { BrowserRouter } from "react-router-dom";
import AppRoutes from './components/app-routes/app-routes';

import './app.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
