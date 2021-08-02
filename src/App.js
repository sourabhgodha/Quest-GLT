import './App.css';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import Product from './Component/Pages/Product';

function App() {
  return (
    <div className="App">
         <BrowserRouter basename="">
				<Switch>
					<Route exact path="/" component={Product} />
				</Switch>
			</BrowserRouter>   
    </div>
  );
}

export default App;
