import React from 'react';
import {
  ScoreItem,
  Container,
  Score,
  TeamLabelBox,
  TeamName,
  Time,
} from './style';

class ScoreBoard extends React.Component {
  render() {
    return (
      <Container>
        <Score>
          <ScoreItem>15</ScoreItem>-<ScoreItem>{this.props.index}</ScoreItem>
        </Score>
        <TeamLabelBox>
          <TeamName>Bedene, Aljaz</TeamName>-<TeamName> Daniel, Taro</TeamName>
        </TeamLabelBox>
        <Time>Today, 14:12</Time>
      </Container>
    );
  }
}
export default ScoreBoard;
