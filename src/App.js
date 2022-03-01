import LoadingBar from "react-redux-loading-bar";
import { useAuth } from "hooks/useAuth";

import Routes from "routes";

const App = () => {
  const [isCheckingAuth, isLoggedIn] = useAuth();

  if (isCheckingAuth) {
    return <p>Checking authentication...</p>;
  }

  return (
    <div className="App">
      <LoadingBar className="loading-bar" />
      <Routes isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default App;
