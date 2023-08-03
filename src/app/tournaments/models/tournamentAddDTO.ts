import {TournamentCategory} from "../enums/tournamentCategory";

export interface TournamentAddDTO{
  name: string;
  location: string;
  minPlayers: number;
  maxPlayers: number;
  eloMin: number;
  eloMax: number;
  categories: TournamentCategory[];
  womenOnly: boolean;
  endOfRegistrationDate: string;
}
