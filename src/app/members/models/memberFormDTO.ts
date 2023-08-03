import {UserGender} from "../enums/userGender";

export interface MemberFormDTO{
  username: string;
  email: string;
  birthDate: string;
  elo: number;
  gender: UserGender;
}
