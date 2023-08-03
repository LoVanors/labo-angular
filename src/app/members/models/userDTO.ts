import {UserRole} from "../enums/userRole";
import {UserGender} from "../enums/userGender";

export interface UserDTO {
  birthDate: string;
  elo: number;
  email: string | null;
  gender: UserGender;
  id: string;
  role: UserRole;
  username: string | null;
}
