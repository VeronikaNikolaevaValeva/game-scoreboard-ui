import PageLayout from '../components/PageLayout';
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import React, { useState, Component, useEffect } from 'react';
import { useStopwatch  } from 'react-timer-hook';
import Scoreboard from '../components/Scoreboard';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { HubConnectionBuilder } from '@microsoft/signalr';

function HomePage() {
    const [ connection, setConnection ] = useState(null);
    const [ scoreResults, setScoreResults] = useState([])
    const [ countOfScoreResults, setCountOfScoreResults] = useState(0);
    const [ page, setPage] = useState(1);
    const { seconds } = useStopwatch({ autoStart: true });
    
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://gamescoreabordservice.azurewebsites.net/scoreboard')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                    connection.on('ReceiveListOfUserScores', scores => {
                      if(scores!=[]){
                      setScoreResults(scores.userScoreResponses);
                      setCountOfScoreResults(scores.totalUserScores);
                      }
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    const RequestListOfUserScoreResponse = async () => {
        if (connection._connectionStarted) {
            try {
                await connection.send('RequestListOfUserScoreResponse', page);
                
            }
            catch(e) {
                console.log(e);
            }
        }
    }

    if(seconds %10==0 || seconds == 1){
      RequestListOfUserScoreResponse();
    }
    

  return (
    <PageLayout>
      <>
        <Container style={{ paddingTop: "1rem", paddingBottom: "11rem", marginBottom:"13rem"}}>
          <Row className="d-flex align-items-stretch">
            <Card className="bg-dark text-white" border="primary" style={{ height: "100%", width: "100%" }}>
              <Card.Title
              onClick={RequestListOfUserScoreResponse}
                class="d-flex justify-content-center"
                style={{ paddingTop: "2rem"}}>
                <h1>SCOREBOARD</h1>
              </Card.Title>
              <Card.Body >
                <Scoreboard scoreResults={scoreResults} countOfScoreResults={countOfScoreResults} />          
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </>
    </PageLayout>
  );
}

export default HomePage;
