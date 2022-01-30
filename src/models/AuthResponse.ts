import { IUser } from "./IUser";

export interface AuthResponseModel {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
