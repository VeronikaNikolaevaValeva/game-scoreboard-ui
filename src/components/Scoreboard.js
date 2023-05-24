import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import StatusBar from './StatusBar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Popover from 'react-bootstrap/Popover';
import { useState } from 'react';

function Scoreboard(props) {
  return (
    <ListGroup as="ol">
      {props.scoreResults.map(item =>(
        <OverlayTrigger
        key={item.chartPosition}
        placement="bottom"
        overlay={
          <Popover id="popover-basic">
            <Popover.Header as="h3">{item.nickname}</Popover.Header>
               <ListGroup variant="flush" key={item.chartPosition}>
                <ListGroup.Item>Played quizes: {item.amountOfPlayedGames}</ListGroup.Item>
                <ListGroup.Item>Total questions: {item.amountAnsweredQuestions}</ListGroup.Item>
                <ListGroup.Item>Correct answers: {item.correctAnswerCount}</ListGroup.Item>
                <ListGroup.Item>Incorrect answers: {item.incorrectAnswerCount}</ListGroup.Item>
              </ListGroup>       
          </Popover>}>
          <ListGroup.Item
              action 
              as="li"
              className="bg-dark text-white d-flex justify-content-between align-items-start">
            <div className="ms-2 me-auto" style={{width:'100%'}}>
              <div className="fw-bold">{item.chartPosition+1}. {item.nickname}</div>
              <StatusBar value={item.overallScore}/>
            </div>
          </ListGroup.Item>
         </OverlayTrigger>
      ))}
      
    </ListGroup>
  )
}

export default Scoreboard;