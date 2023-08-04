import {UserDTO} from "../../members/models/userDTO";

export interface TokenDTO{
  token?: string;
  user: UserDTO;
}
