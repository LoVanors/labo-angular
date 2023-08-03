import {MatchResult} from "../enums/matchResult";

export interface MatchDTO{
  id: number;
  tournamentId: number;
  blackName: string|null;
  blackId: string|null;
  whiteName: string|null;
  whiteId: string|null;
  result: MatchResult;
  round: number;
}
