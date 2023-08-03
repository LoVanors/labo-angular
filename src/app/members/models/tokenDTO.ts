import {UserDTO} from "./userDTO";

export interface TokenDTO{
  token: string|null;
  user: UserDTO;
}
