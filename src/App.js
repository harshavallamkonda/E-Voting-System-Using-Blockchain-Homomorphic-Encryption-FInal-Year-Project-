import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Contact from "./components/Footer";
import VoterLogin from "./components/pages/VoterLogin";
import AdminLogin from "./components/pages/AdminLogin";
import AdminOptions from "./components/pages/AdminOptions";
import Voting from "./components/pages/Voting";
import VotedStatus from "./components/pages/VotedStatus";
import CreatePoll from "./components/pages/CreatePoll";
import ConstituencyResult from "./components/pages/ConstituencyResult";
import ElectionResult from "./components/pages/ElectionResult";

function App() {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' exact element={<Home />} />
					<Route path='/contact' exact element={<Contact />} />
					<Route path='/voter-sign-in' exact element={<VoterLogin />} />
					<Route path='/voting' exact element={<Voting />} />
					<Route path='/admin' exact element={<AdminLogin />} />
					<Route path='/admin/options' exact element={<AdminOptions />} />
					<Route path='/admin/create-poll' exact element={<CreatePoll />} />
					<Route
						path='/admin/constituency-result'
						exact
						element={<ConstituencyResult />}
					/>
					<Route
						path='/admin/election-result'
						exact
						element={<ElectionResult />}
					/>
					<Route
						path='/voting-status:completed'
						exact
						element={<VotedStatus />}
					/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
