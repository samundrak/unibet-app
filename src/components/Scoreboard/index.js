import React from 'react';
import PropTypes from 'prop-types';
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

const handleBetClick = eventId => {
  return () => {
    window.open(
      `${process.env.REACT_APP_UNIBET_EVENT_URL}${eventId}`,
      '_blank',
    );
  };
};
const ScoreBoard = ({ event = {} }) => {
  const { score = {} } = event;
  return (
    <Container>
      <Score>
        <ScoreItem>{score.home}</ScoreItem>-<ScoreItem>{score.away}</ScoreItem>
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
ScoreBoard.propTypes = {
  event: PropTypes.shape({
    homeName: PropTypes.string,
    awayName: PropTypes.string,
    start: PropTypes.string,
    state: PropTypes.string,
    id: PropTypes.number,
    score: PropTypes.shape({
      home: PropTypes.string,
      away: PropTypes.string,
    }),
  }),
};
export default ScoreBoard;
