import {TournamentCategory} from "../enums/tournamentCategory";
import {TournamentStatus} from "../enums/tournamentStatus";

export interface TournamentDTO{
  id: string;
  name: string|null;
  location: string|null;
  minPlayers: number;
  maxPlayers: number;
  eloMin: number|null;
  eloMax: number|null;
  categories: TournamentCategory[];
  womenOnly: boolean;
  endOfRegistrationDate: string;
  count: number;
  canRegister: boolean;
  isRegistered: boolean;
  status: TournamentStatus[]|null;
  currentRound: number;
}
