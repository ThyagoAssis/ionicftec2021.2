import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import { map } from 'rxjs/operators';
import { Produtos } from '../model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  //Ferramenta para manipular as coleções
  itemCollection: AngularFirestoreCollection

  constructor(private af: AngularFirestore) { 
    this.itemCollection = af.collection('itens');
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

  cadastro(item: any){
    return this.itemCollection.add(item)
  }

  deletar(id: string){
    return this.itemCollection.doc(id).delete()
  }

  editar(id: string, item: any){
    return this.itemCollection.doc(id).update(item)
  }

}



