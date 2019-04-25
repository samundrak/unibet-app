// @flow
import EventEmitter from './EventEmitter';
import type { ScheduleRunnerContract, RecordType, ScoreType } from '../types';
import { getScores } from '../api';

class LiveScoreFetcher extends EventEmitter implements ScheduleRunnerContract {
  normalizeRecords(
    records: Array<{ event: RecordType, liveData: { score: ScoreType } }>,
  ): Array<RecordType> {
    return records.map(
      ({
        event,
        liveData,
      }: {
        event: RecordType,
        liveData: { score: ScoreType },
      }): RecordType => ({
        homeName: event.homeName,
        awayName: event.awayName,
        sport: event.sport,
        id: event.id,
        start: event.start,
        state: event.state,
        score: liveData.score,
      }),
    );
  }

  /**
   * This method will be executed by ScheduleRunner on every (n) time(ms/s)
   */
  run() {
    (async () => {
      try {
        const scores = await getScores();
        const normalizedRecords = this.normalizeRecords(scores.liveEvents);
        this.emit('data', { records: normalizedRecords });
      } catch (err) {
        this.emit('error', { message: err.message });
      }
    })();
  }
}
export default LiveScoreFetcher;
