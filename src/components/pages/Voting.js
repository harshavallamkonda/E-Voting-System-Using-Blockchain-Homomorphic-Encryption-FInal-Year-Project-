import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { connectDefault, vote } from "../web3/Web3";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Paper, Avatar } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import {
	db,
	doc,
	getDoc,
	query,
	where,
	collection,
	getDocs,
} from "../../firebase/config";

const Voting = () => {
	let navigate = useNavigate();
	const location = useLocation();
	const voterIDfromVoterLogin = location.state.voterID;
	console.log(
		"Voter ID fetched from voting page: ",
		voterIDfromVoterLogin.voterID,
	);

	let voterID = voterIDfromVoterLogin.voterID;
	console.log("Voter ID: ", voterID);

	const handleVoterLogout = () => {
		navigate(`/voter-sign-in`);
	};

	//voter details
	const [name, setName] = useState("");
	const [constituency, setConstituency] = useState("");
	const [state, setState] = useState("");
	const [wardnum, setWardnum] = useState("");
	const [voterDocID, setVoterDocID] = useState("");

	//candidate details
	const [candidateDetails, setCandidateDetails] = useState([]);
	const [party, setParty] = useState("");
	const [candidateName, setCandidateName] = useState("");
	const [voterIndex, setvoterIndex] = useState(0);

	//fetch voter document ID from the database to fetch the voter detais
	const fetchVoterDocumentID = async () => {
		const q = query(
			collection(db, "voter-details"),
			where("VoterID", "==", voterID),
		);

		const querySnapshot = await getDocs(q);

		querySnapshot.docs.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, " => ", doc.data());
			setVoterDocID(doc.id);
		});
	};

	//fetching voter details
	const fetchVoterData = async (voterDocID) => {
		const docRef = doc(db, "voter-details", voterDocID);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			console.log("Document data:", docSnap.data());
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
		setName(docSnap.data().Name);
		setConstituency(docSnap.data().Constituency);
		setState(docSnap.data().State);
		setWardnum(docSnap.data().Wardnum);
	};

	//fetching candidate details
	const fetchCandidateData = async (wardnum) => {
		const q = query(
			collection(db, "candidate-details"),
			where("wardnum", "==", wardnum.toString()),
		);

		const querySnapshot = await getDocs(q);

		querySnapshot.docs.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			//console.log( doc.id, " => ", doc.data() );
			setCandidateDetails((prev) => {
				return [...prev, doc.data()];
			});
		});
	};

	useEffect(() => {
		connectDefault();
		fetchVoterDocumentID();
		console.log(voterDocID);
		fetchVoterData(voterDocID);
		fetchCandidateData(wardnum);
		//eslint-disable-next-line
	}, [voterDocID, wardnum]);

	//Vote button
	const castVote = (event, _candidateID) => {
		event.preventDefault();
		
		window.confirm(
			"Press 'OK' to vote for Candidate" +
				{ candidateName } +
				"of" +
				{ party } +
				"?",
		);
		try {
			vote(candidateName);
			alert("Your vote has successfully been cast");

			navigate(`/`);
		} catch (error) {
			alert(" There was an error " + { error });
		}
	};
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const paperstyle = {
		padding: 30,
		height: "60vh",
		width: "40vh",
		margin: "60px auto",
	};
	const votepaperstyle = {
		padding: 30,
		height: "70vh",
		width: "120vh",
		margin: "40px auto",
		overflow: "auto",
	};
	makeStyles((theme) => ({
		paper: {
			padding: theme.spacing(1),
			textAlign: "center",
			color: theme.palette.text.secondary,
			margin: "80px auto",
			maxHeight: 200,
			maxWidth: 900,
		},
		image: {
			width: 128,
			height: 128,
		},
		img: {
			margin: "left",
			display: "block",
			maxWidth: "100%",
			maxHeight: "100%",
		},
		inline: {
			display: "inline",
		},
	}));

	return (
		<Grid
			container
			/*spacing={2}*/ style={{
				backgroundColor: "rgb(255, 194, 0, 25%)",
				height: "89vh",
			}}>
			{/* Displaying the voter details */}
			<Paper elevation={10} style={paperstyle}>
				<Grid align='center'>
					<Avatar src='/broken-image.jpg' />
					<br />
					<Typography component='h2' variant='h5'>
						Voter Details
					</Typography>
					<Grid align='left'>
						<br />
						<br />
						<Typography variant='body1'>
							<b>Name: </b>
							{name}
						</Typography>
						<br />
						<Typography variant='body1'>
							<b>Constituency: </b>
							{constituency}
						</Typography>
						<br />
						<Typography variant='body1'>
							<b>State: </b>
							{state}
						</Typography>
					</Grid>
					<br />
					<Button
						fullWidth
						variant='contained'
						style={{
							borderRadius: 50,
							backgroundColor: "rgb(255, 209, 3)",
						}}
						sx={{ mt: 3, mb: 2 }}
						onClick={handleVoterLogout}>
						Logout
					</Button>
				</Grid>
			</Paper>

			{/* Displaying the candidate details */}
			<Paper elevation={10} style={votepaperstyle}>
				{candidateDetails.map((doc) => {
					return (
						<List>
							<ListItem alignItems='flex-start'>
								<ListItemAvatar>
									<Avatar
										style={{
											background: "rgb(255, 209, 3)",
										}}
										alt={doc.partyname}
										src='/static/images/avatar/1.jpg'
									/>
								</ListItemAvatar>
								<ListItemText
									primary={doc.partyname}
									secondary={
										<React.Fragment>
											<Typography
												component='span'
												variant='body2'
												color='textPrimary'></Typography>
											{doc.firstname} {doc.lastname}
										</React.Fragment>
									}
								/>
								<br />
								<br />
								{/*Vote botton*/}
								<Button
									style={{
										backgroundColor: "rgb(255, 194, 0)",
										maxWidth: "50%",
									}}
									variant='contained'
									onClick={handleOpen}>
									Vote
								</Button>
								<Modal
									keepMounted
									open={open}
									onClose={handleClose}
									aria-labelledby='keep-mounted-modal-title'
									aria-describedby='keep-mounted-modal-description'>
									<Box sx={styles}>
										<Typography
											id='keep-mounted-modal-title'
											variant='h6'
											component='h2'
											align='center'
											style={{ radius: "15px" }}>
											THANKYOU FOR VOTING !!!
										</Typography>
										<Button
											align='center'
											onClick={(e) => {
												castVote(e);
												setCandidateName();
											}}>
											CONTINUE
										</Button>
									</Box>
								</Modal>
							</ListItem>
							<Divider variant='inset' component='li' />
						</List>
					);
				})}
			</Paper>
		</Grid>
	);
};

export default Voting;
