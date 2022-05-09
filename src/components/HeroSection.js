import React from 'react';
import '../App.css';
import './HeroSection.css';
import {Container, Row, Col} from 'react-bootstrap';

/*images*/
import votingmadeeasy from '../images/easeofvoting.png';
import freeandfair from '../images/freeandfair.png';
import security from '../images/security.png';

function HeroSection() {
  return (
    
    <div className="hero-container">
      <Container>
      <Row>
        <Col>
          <div className="descImages">
            <img src={votingmadeeasy} alt="Voting Made Easy.png" className="descImages"/> 
          </div>
        </Col>
        <Col>
        <div>
          <h1>Voting Made Easy</h1>
          <br />
          <p>Vote from the comfort of your home using the application</p>
          <p>available on any device which can be connected to the internet</p>
        </div>
        </Col>
        </Row>

        <Row>
          <Col>
          <div className="descImages">
            <img src={freeandfair} alt="Free and Fair.png" className="descImages"/> 
          </div>
          </Col>
          <Col>
          <div>
            <h1>Free and Fair</h1>
            <br />
            <p>The secure platform ensures that the results directly reflect the</p>
            <p>people's choice without any foulplay</p>
          </div>
          </Col>
          
        </Row>

        <Row>
          <Col>
          <div className="descImages">
            <img src={security} alt="security.jpg" className="descImages"/> 
          </div>
          </Col>
          <br />
          <Col>
          <div>
            <h1>Security</h1>
            <br />
            <p>Blockchain technology ensures that the election data stored cannot</p>
            <p>be tampered with</p>
          </div>
          </Col>
        </Row>

      </Container>
    </div>

  );
}

export default HeroSection;
