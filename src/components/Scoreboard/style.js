import styled from 'styled-components';

const MARGIN_BETWEEN_TOP_ITEMS = '2%';
const Container = styled.div`
  width: inherit;
  height: inherit;
  background-color: #222222;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Score = styled.div`
  margin-top: ${MARGIN_BETWEEN_TOP_ITEMS};
  width: inherit;
  justify-content: center;
  align-items: center;
  display: flex;
  color: #e6ab38;
  font-size: 2em;
`;
const ScoreItem = styled.div`
  font-weight: bold;
  margin-right: 1%;
  margin-left: 1%;
`;
const TeamName = styled.div`
  margin-right: 1%;
  margin-left: 1%;
`;
const TeamLabelBox = styled.div`
  color: white;
  margin-top: ${MARGIN_BETWEEN_TOP_ITEMS};
  width: inherit;
  justify-content: center;
  align-items: center;
  display: flex;
  font-weight: bold;
  font-size: 1.5em;
`;
const Time = styled.div`
  margin-top: ${MARGIN_BETWEEN_TOP_ITEMS};
  font-weight: bold;
  color: #867b61;
  font-size: 1em;
`;
const Gap = styled.div`
  margin-top: ${MARGIN_BETWEEN_TOP_ITEMS};
`;
export { Gap, TeamName, ScoreItem, Container, Score, TeamLabelBox, Time };
