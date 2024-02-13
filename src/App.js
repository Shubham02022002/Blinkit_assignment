import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/main/index.jsx";
import Signup from "./components/signup/index.jsx";
import Login from "./components/login/index.jsx";

function App() {
	const user = localStorage.getItem("token");
	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;