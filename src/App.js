import React from 'react';
import './App.css';
import { useAuth0, user } from '@auth0/auth0-react';

import Menu from './components/Menu';
import Routes from './routes/Routes';
import LanguageSwitch from './components/LanguageSwitch';

function App() {
  /* const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>
 */
  const { user } = useAuth0();

  return (
    <div className="App">
      <Menu />
      <div className="container">
        <Routes user={user} />
      </div>
    </div>
  );
}

export default App;
