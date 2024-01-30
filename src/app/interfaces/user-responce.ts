import { RolResponce } from "./rol-responce";

export interface UserResponce {
    idUser: number,
    email: string,
    estadoUser: boolean,
    roles: RolResponce[]
}
