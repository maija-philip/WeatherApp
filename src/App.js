/*
 Author: Maija Philip
 Date: 10-31-2022
 */

// import logo from './logo.svg';
import './theme.css';
import './App.css';
import Weather from './components/get-weather.js';


// Objectively, other than importing "theme.css" and "app.css" this
// functional Component does nothing.  You could just move those two
// import statements into index.js and have it go to <Weather> instead
// of <App>.  It isn't necessary to remove this ... but you should
// certainly think about minimizing your Components when and where you can.
function App() {
  return (
    <main>
      <Weather />
    </main>
  );
}

export default App;
