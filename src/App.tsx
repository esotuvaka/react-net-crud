import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import CRUD from './Crud';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<CRUD />
		</div>
	);
}

export default App;
