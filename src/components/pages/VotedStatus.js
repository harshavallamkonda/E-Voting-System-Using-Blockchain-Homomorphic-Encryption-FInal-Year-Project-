import React from "react";
import { useNavigate } from "react-router-dom";
import { Paper } from "@material-ui/core/";
import Typography from "@mui/material/Typography";
import greenTick from "../../images/green_tick.png";
import Button from "@mui/material/Button";

const VotedStatus = () => {
	let navigate = useNavigate();

	const handleBackHome = () => {
		let path = "/";
		navigate(path);
	};

	const paperstyle = {
		padding: 30,
		"max-height": "60vh auto",
		"max-width": "80vh",
		"margin-top": "100px",
		"margin-bottom": "100px",
		margin: "60px auto",
	};

	return (
		<div align='center'>
			<Paper elevation={10} style={paperstyle} align='center'>
				<div>
					<Typography>
						<h1>Thank you for voting</h1>
						<h4>Your vote has been registred. Thank you for your time.</h4>
					</Typography>
					<br />
					<img
						src={greenTick}
						alt='Checked.png'
						style={{ height: "120px", width: "120px" }}
						align='center'
					/>
				</div>
			</Paper>
			<Button
				fullwidth
				variant='contained'
				onClick={handleBackHome}
				style={{
					borderRadius: 50,
					backgroundColor: "rgb(255, 209, 3)",
					padding: "18px 36px",
					fontSize: "18px",
				}}
				sx={{ mt: 3, mb: 2 }}>
				GO BACK HOME
			</Button>
		</div>
	);
};

export default VotedStatus;
