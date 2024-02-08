import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UserResponce } from '../../interfaces/user-responce';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  AllUsuarios(){
    let url = `${URL}/user/`;

    return this.http.get<UserResponce[]>(url);
  }

  findUser(id: string){
    let url = `${URL}/user/${id}`;

    return this.http.get<UserResponce>(url);
  }

  cambioRoles(idUser: string, roles:String[]){
    let url = `${URL}/userol/new/${idUser}`;

    return this.http.post(url,roles);
  }

  activarUser(estado: boolean, idUser: string){
    let url = `${URL}/user/delLog/${estado}/${idUser}`;

    return this.http.put<string>(url,{});
  }
}
