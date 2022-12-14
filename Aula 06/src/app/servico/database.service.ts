import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Produtos } from '../model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  HttpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  }

  readonly API = "http://localhost:3000/lista/";

  constructor(private http: HttpClient) { }

  getItem(){
    return this.http.get<Produtos[]>(this.API);
  }

  postItem(dados: any){
    return this.http.post(this.API, JSON.stringify(dados), this.HttpOptions).subscribe()
  }

  delItem(id: number){
    return this.http.delete(this.API + id).subscribe();
  }
}
