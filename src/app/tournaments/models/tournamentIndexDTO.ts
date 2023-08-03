import {TournamentDTO} from "./tournamentDTO";

export interface TournamentIndexDTO{
  total: number;
  results: TournamentDTO[]|null;
}
