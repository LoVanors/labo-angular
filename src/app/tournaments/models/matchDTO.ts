import {MatchResult} from "../enums/matchResult";

export interface MatchDTO{
  id: number;
  tournamentId: number;
  blackName: string;
  blackId: string;
  whiteName: string;
  whiteId: string;
  result: MatchResult;
  round: number;
}
