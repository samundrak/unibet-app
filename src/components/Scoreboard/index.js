import React from 'react';
import format from 'date-fns/format';
import isToday from 'date-fns/is_today';
import {
  ScoreItem,
  Container,
  Score,
  TeamLabelBox,
  TeamName,
  Time,
  Gap,
} from './style';
import Button from '../Button';

const getIconPathBySport = (sport = '') => {
  let path = '/icons/';
  const imageAvailable = ['basketball', 'football', 'tennis'];
  const normalizedSport = sport.toLowerCase();
  const file =
    imageAvailable.indexOf(normalizedSport) > -1 ? normalizedSport : 'default';
  return `${path}${file}.png`;
};
const isMatchRunning = (start, state) => {
  if (!start || !state) return false;
  return isToday(start) || state.toLowerCase() === 'started';
};
const handleBetClick = (eventId) => {
  return () => {
    window.open(
      `https://www.unibet.com/betting#/event/live/${eventId}`,
      '_blank'
    );
  };
};
const ScoreBoard = ({ event = { score: {} } }) => {
  return (
    <Container>
      <Score>
        <ScoreItem>{event.score.home}</ScoreItem>-
        <ScoreItem>{event.score.away}</ScoreItem>
      </Score>
      <TeamLabelBox>
        <img src={getIconPathBySport(event.sport)} alt={event.sport} />
        <TeamName>{event.homeName}</TeamName>-
        <TeamName> {event.awayName}</TeamName>
      </TeamLabelBox>
      <Time>
        {isMatchRunning(event.start, event.state)
          ? `Today, ${format(event.start, 'HH:mm')}`
          : format(event.start, 'YYYY-MM-DD')}
      </Time>
      <Gap>
        <Button onClick={handleBetClick(event.id)}>Place a Bet</Button>
      </Gap>
    </Container>
  );
};
export default ScoreBoard;
