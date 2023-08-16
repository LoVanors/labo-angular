import {TournamentCategory} from "../enums/tournamentCategory";
import {MatchDTO} from "./matchDTO";
import {TournamentStatus} from "../enums/tournamentStatus";
import {UserDTO} from "../../members/models/userDTO";

export interface TournamentDetailsDTO{
  id: string;
  name: string|null;
  location: string|null;
  minPlayers: number;
  maxPlayers: number;
  eloMin: number|null;
  eloMax: number|null;
  categories: TournamentCategory[]|null;
  womenOnly: boolean;
  endOfRegistrationDate: string;
  count: number;
  canRegister: boolean;
  isRegistered: boolean;
  status: TournamentStatus;
  currentRound: number;
  players: UserDTO[]|null;
  canStart: boolean;
  canValidateRound: boolean;
  matches: MatchDTO[]|null;
}
