import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

import { Produtos } from 'src/app/model/produto.model';
import { AuthService } from 'src/app/servico/auth.service';
import { FirebaseService } from 'src/app/servico/firebase.service';
import { UtilityService } from 'src/app/servico/utility.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  
  image = "https://cdn.pixabay.com/photo/2015/02/23/20/53/tomatoes-646645_960_720.jpg";

  listaProdutos: Produtos[]  = [];
  //resultado = [ ...this.listaProdutos];

  user: any

  constructor(
    //Nosso serviço de banco de dados(json-server)
    //private DataBase: DatabaseService, 

    //Banco de dados firebase
    private firebase: FirebaseService,

    //ActionSheet
    private actionSheet: ActionSheetController,

    //Serviço de utilidades 
    private utilidades: UtilityService,
    
    private authServicce: AuthService
  ) {}

  ngOnInit(){
    //Carrega o metodo no inicio da pagina
    this.utilidades.carregando("Aguarde...", 2000);
    //this.DataBase.getItem().subscribe(results => this.listaProdutos = results);
    this.firebase.consulta().subscribe(results => {
      this.listaProdutos = results;
      
      //this.resultado = [ ...this.listaProdutos];
    });
    
    this.authServicce.getAuth().user.subscribe(results => {
      this.utilidades.toastando('Ola! ' + results.email, 'top', 2000, "dark" )
    });

    
    
  }   

  captura(event){    
    const query = event.target.value.toUpperCase();
    this.listaProdutos = [...this.listaProdutos.filter(d => d.produto.indexOf(query) > -1)];
  }  

  //Metodo do botao excluir
  deletar(id: string){

    try{
      //this.DataBase.delItem(id);
      this.firebase.deletar(id);
    }catch(err){
      console.log(err);
    }finally{
      //Chama a menssagem 
      this.utilidades.toastando("Item Excluido", "bottom", 2000, "danger");     
    }  

  } 

  //Metodo do actionsheet
  async actionMetod(item: Produtos){
    const action = this.actionSheet.create({
      mode: 'ios',
      header: 'Selecione um Opção:',
      buttons: [
        {
          text: item.status ? 'Desmarcar' : 'Marcar',
          icon: item.status ? 'radio-button-off' : 'checkmark-circle',

          handler: () => {
            item.status = !item.status;
            //this.DataBase.statusItem(item);
            this.firebase.editar(item.id, item);
          }
        },       
        {
          text: "Cancelar",
          handler: () => {
            this.utilidades.toastando('Cancelamos o encontro', "middle", 2000, "secondary");
          }
        }
      ]
    }); (await action).present();
  }


  
}
