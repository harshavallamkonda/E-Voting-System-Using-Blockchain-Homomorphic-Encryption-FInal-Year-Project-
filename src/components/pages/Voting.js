import React, { useState, useEffect} from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { vote } from '../web3/Web3'
import Home from './Home'
import { useNavigate } from 'react-router-dom'
// import { candidate1 , candidate2, candidate3 } from '../images/Voting';

function Voting() {
    let navigate = useNavigate()

    useEffect( () => {
    })

    const [party, setParty] = useState('')
    const [candidateID, setCandidateID] = useState(0)
    const [voterIndex, setvoterIndex] = useState(0)

    const castVote = async (event, _candidateID) => {
        event.preventDefault()
        setvoterIndex((voterIndex) => voterIndex + 1)
        setCandidateID(_candidateID)
        (candidateID === 1) ? setParty('REP') : 
        (candidateID === 2) ? setParty('DEM') :
        setParty('KW')

        window.confirm(
            "Press 'OK' to vote for Candidate" + {candidateID} + "of" + {party} + "?"
            )

        await vote(voterIndex, candidateID)
        
        navigate('/')

        
    }

    return (
    
    <Container>
        <Row>
            <Col className='justify-content-center d-flex'>
            <Container>
                <Row style={{marginTop: '5vh', backgroundColor: '#ffff00'}}>
                    <div 
                    style={{
                        display: 'flex',
                        justifyContent: 'left',
                        padding: '3vw'
                    }}>
                        <img 
                        style={{ height: '20vw',width: '30vw'}}
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.americanbazaaronline.com%2Fwp-content%2Fuploads%2F2020%2F11%2FJoe-Biden.jpg&f=1&nofb=1"
                        alt="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fbsmedia.business-standard.com%2F_media%2Fbs%2Fimg%2Fmisc%2F2020-07%2F18%2Ffull%2F20200701146L.jpg&f=1&nofb=1"
                        onClick={ castVote(1) }
                        />
                    </div>
                </Row>
                <Row 
                className='justify-content-center d-flex'
                style={{ marginTop: '5vh'}}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: '8vw',
                        padding: '10px',
                        backgroundColor: '#ffff00'
                    }}>
                        3
                    </div>
                </Row>
            </Container>
            </Col>
        </Row>
    </Container>
    )
}

export default Voting;