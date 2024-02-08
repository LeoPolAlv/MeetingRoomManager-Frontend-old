import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { RolRequest } from '../../interfaces/rol-request';
import { RolResponce } from '../../interfaces/rol-responce';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(
    private http: HttpClient,
  ) { }

  buscarRoles(){
    let url = `${URL}/rol/`;
    return this.http.get<RolResponce[]>(url);
  }

  altaRol(rolForm:RolRequest){
    let url = `${URL}/rol/new`;
    return this.http.post<RolResponce>(url,rolForm);
  }

  updtRol(rolForm:RolRequest){
    let url = `${URL}/rol/updt`;
    return this.http.put<RolResponce>(url,rolForm);
  }

  deleteRol(id:number){
    let url = `${URL}/rol/delete/${id}`;
    return this.http.delete(url);
  }
}
