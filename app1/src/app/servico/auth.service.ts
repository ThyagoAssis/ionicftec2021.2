import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularAuth: AngularFireAuth
  ) { }

  //Autenticar um usuário existente
  loginUser(user){
    
    return this.angularAuth.signInWithEmailAndPassword(user.email, user.password).catch(error => console.log(error.message));
  }

  //Criar um usuario 
  createUser(user){
    return this.angularAuth.createUserWithEmailAndPassword(user.email, user.password).catch(error => console.log(error.message));
  }

  //Desconecta um usuario
  logoutUser(){
    return this.angularAuth.signOut();
  }

  //Obtem informações do usuario
  getAuth(){
    return this.angularAuth;
  }


}
