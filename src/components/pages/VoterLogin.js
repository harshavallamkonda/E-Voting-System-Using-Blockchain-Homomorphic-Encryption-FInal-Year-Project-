import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { connectDefault, loadVoterAccount } from "../web3/Web3";
import {
	query,
	collection,
	db,
	where,
	getDocs,
	auth,
} from "../../firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
/* For routing to voting page after successfull verification */
import { useNavigate } from "react-router-dom";

const Copyright = (props) => {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}>
			{"Copyright © "}
			<Link color='inherit' href='/'>
				VOTE
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
};

const theme = createTheme();

const VoterLogin = () => {
	const [voterName, setvoterName] = useState("");
	const [voterID, setvoterID] = useState("");
	const [phoneNumber, setphoneNumber] = useState("");
	const [OTP, setOTP] = useState("");
	const [voterDetails, setVoterDetails] = useState([]);
	const [user, setUser] = useState([]);
	const [show, setshow] = useState(false);

	/* function for navigation */
	let navigate = useNavigate();
	const routeChange = () => {
		let path = `/voting`;
		/* to send the voter ID to the voting page after successful verification of the voter */
		navigate(path, { state: { voterID: { voterID } } });
	};

	//Query to check if voter's details exist in the election commission's database
	const voterExists = async (voterID, voterName, phoneNumber) => {
		console.log(phoneNumber);
		const q = query(
			/* complex query to see if voter with the matching details exists in the election commission's database*/
			collection(db, "voter-details"),
			where("VoterID", "==", voterID),
			where("Name", "==", voterName),
			where("Phone", "==", phoneNumber),
		);
		const querySnapshot = await getDocs(q);

		querySnapshot.docs.forEach((doc) => {
			setVoterDetails((prev) => {
				return [...prev, doc.data()];
			});
		});
		console.log("Voter found: ", voterDetails);
	};

	useEffect(() => {
		voterExists(voterID, voterName, phoneNumber);
		connectDefault();
		//eslint-disable-next-line
	}, [voterID, voterName, phoneNumber, voterDetails.VoterID]);

	/* For sending OTP after verifyng */
	const sendOTP = (event) => {
		if (voterName === "") {
			return;
		}
		if (voterID === "") {
			return;
		}
		if (phoneNumber === "" || phoneNumber.length < 13) {
			return;
		}
		event.preventDefault();

		console.log(voterDetails);
		if (voterDetails.length === 0) {
			alert("Voter not found");
			window.location.reload();
		}

		window.recaptchaVerifier = new RecaptchaVerifier(
			"recaptcha-container",
			{
				size: "invisible",
				callback: (response) => {},
			},
			auth,
		);
		const appVerifier = window.recaptchaVerifier;
		signInWithPhoneNumber(auth, phoneNumber, appVerifier)
			.then((confirmationResult) => {
				alert("OTP Sent Successfully!");
				window.confirmationResult = confirmationResult;
				setshow(true);
			})
			.catch((err) => {
				alert(err);
				window.location.reload();
			});
	};

	const handleSubmit = (event) => {
		if (OTP === "") {
			return;
		}
		event.preventDefault();

		if (OTP.length === 6) {
			let confirmationResult = window.confirmationResult;

			confirmationResult
				.confirm(OTP)
				.then((result) => {
					setUser(result.user);
					console.log("User: ", user);
					alert("Voter verified successfully");

					if (loadVoterAccount({ voterName }, { voterID }, { phoneNumber })) {
						alert("Voter Login Successful");
						routeChange();
					} else {
						alert("Voter Login Failed");
					}
				})
				.catch((error) => {
					alert("User not verified please retry again");
					window.location.reload(false);
				});
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h2' variant='h5'>
						Voter Sign in
					</Typography>
					<Box component='form' validate sx={{ mt: 1 }}>
						{/* Voter Name */}
						<TextField
							margin='normal'
							required
							fullWidth
							label='Full Name as per Voter ID'
							name='votername'
							value={voterName}
							onChange={(e) => setvoterName(e.target.value)}
						/>
						{/* Voter ID */}
						<TextField
							margin='normal'
							required
							fullWidth
							label='Voter ID'
							name='voterid'
							value={voterID}
							onChange={(e) => {
								setvoterID(e.target.value);
							}}
						/>
						{/* Phone Number */}
						<TextField
							margin='normal'
							required
							fullWidth
							label='Phone Number with Country Code'
							name='phoneNumber'
							value={phoneNumber}
							inputProps={{
								inputmode: "tel",
								pattern: "+[0-9]*",
							}}
							onChange={(e) => {
								setphoneNumber(e.target.value);
							}}
						/>
						{/* Generate OTP Button */}
						<Button
							onClick={sendOTP}
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
							style={{ display: !show ? "block" : "none" }}>
							Send OTP
						</Button>
						{/* CAPTCHA to generate OTP */}
						<div
							id='recaptcha-container'
							style={{ display: !show ? "block" : "none" }}></div>
						<Box component='form' validate sx={{ mt: 1 }}>
							{/* OTP */}
							<TextField
								margin='normal'
								required
								fullWidth
								label='OTP'
								name='OTP'
								value={OTP}
								onChange={(e) => {
									setOTP(e.target.value);
								}}
							/>
							{/* Verify Voter Button */}
							<Button
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2 }}
								onClick={handleSubmit}
								type='submit'>
								Verify
							</Button>
						</Box>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
};

export default VoterLogin;
