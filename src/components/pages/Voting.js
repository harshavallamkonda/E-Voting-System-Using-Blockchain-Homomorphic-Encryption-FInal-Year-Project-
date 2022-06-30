import React, { useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { vote } from '../web3/Web3'
import Home from './Home'
import { useNavigate } from 'react-router-dom'
import { Grid , Paper ,Avatar } from '@material-ui/core'
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@mui/material/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
//import { applyActionCode } from 'firebase/auth';
//import Votinglogin from '../pages/VoterLogin';
//import { db } from "../../firebase/config";
// import { candidate1 , candidate2, candidate3 } from '../images/Voting';

function Voting() {
    let navigate = useNavigate()

   

    const [party, setParty] = useState('')
    const [candidateID, setCandidateID] = useState(0)
    const [voterIndex, setvoterIndex] = useState(0)
    //const [currentUser, setcurrentUser] = useState('')

    useEffect( () => {
    })  

    const castVote = (event, _candidateID) => {

        event.preventDefault()
        setvoterIndex((voterIndex) => voterIndex + 1)
        setCandidateID(_candidateID)
        (candidateID === 1) ? setParty('REP') : 
        (candidateID === 2) ? setParty('DEM') :
        (candidateID === 3) ? setParty('KW') :
        alert(
            "There is an error"
        )

        window.confirm(
            "Press 'OK' to vote for Candidate" + {candidateID} + "of" + {party} + "?"
            )

        try{
            vote(voterIndex, candidateID)
            alert(
                "Your vote has successfully been cast"
            )
            navigate(`/`)
        }catch(error){
            alert(
                " There was an error " + {error}
            )
        }

    }


    
    const paperstyle={padding: 30 , height:'50vh', width:'40vh',margin:"60px auto"}
    const votepaperstyle={padding: 30 , height:'40vh', width:'120vh',margin:"40px auto"}
    const useStyles = makeStyles((theme) => ({
     
      paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin:"60px auto",
        maxHeight:200,
        maxWidth: 900,
      },
      image: {
        width: 128,
        height: 128,
      },
      img: {
        margin: 'left',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },  
   
      inline: {
        display: 'inline',
      },
    }));

    
    const classes = useStyles();

    return (

      
      <Grid container spacing={2}>  

            <Paper elevation={10} style={paperstyle} >
              <Grid align='center'>
                <Avatar src="/broken-image.jpg" />
                <Typography component="h2" variant="h5">
                Voter Details
                </Typography>
                  
              </Grid>
            </Paper>
        
            <Paper elevation={10} style={votepaperstyle} >
            <List>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="BJP" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="BJP"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        
                        color="textPrimary"
                      >
                        
                      </Typography>
                      {"CANDIDATE1"}
                    </React.Fragment>
                  }
                />
                <Button style={{
                  backgroundColor: '#0E86D4'
                }}
                onClick={(e) => {
                    castVote(e, 3)
                }}>
                Vote
              </Button>
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="CONGRESS" src="/static/images/avatar/2.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="CONGRESS"
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                         
                          color="textPrimary"
                        >
                         
                        </Typography>
                        {" CANDIDATE2"}
                      </React.Fragment>
                    }
                  />
                  <Button style={{
                  backgroundColor: '#0E86D4'
                }}
                onClick={(e) => {
                    castVote(e, 3)
                }}>
                Vote
              </Button>
                </ListItem>
            </List>       
            </Paper> 
              
          </Grid>



  
    
    )
  
}

/*  */

export default Voting;