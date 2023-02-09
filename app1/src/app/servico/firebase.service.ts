import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  //Ferramenta para manipular as coleções
  itemCollection: AngularFirestoreCollection

  user:any = {
    id: localStorage.getItem('userId'),
    name: localStorage.getItem('name')
  }; 

  constructor(private af: AngularFirestore) { 
    this.itemCollection = af.collection('user/' + this.user.id + '/' + this.user.name);    
  }
  //Busca todos os produtos
  consulta():any{
    return this.itemCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        })
      })
    )
  }

  //Busca somente um produto
  consultaOne(id: string){
    return this.itemCollection.doc(id).valueChanges();
  }

  cadastro(dados: any){
    return this.itemCollection.add(dados)
  }

  deletar(id: string){
    return this.itemCollection.doc(id).delete()
  }

  editar(id: string, dados: any){
    return this.itemCollection.doc(id).update(dados)
  }


}



