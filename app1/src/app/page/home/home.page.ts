import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

import { Produtos } from 'src/app/model/produto.model';
import { DatabaseService } from 'src/app/servico/database.service';
import { UtilityService } from 'src/app/servico/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  image = "https://cdn.pixabay.com/photo/2015/02/23/20/53/tomatoes-646645_960_720.jpg";

  listaProdutos: Produtos[] = [];

  constructor(
    //Nosso serviço de banco de dados
    private DataBase: DatabaseService,    
    //ActionSheet
    private actionSheet: ActionSheetController,
    //Serviço de utilidades 
    private utilidades: UtilityService   
  ) {}

  ngOnInit(){
    //Carrega o metodo no inicio da pagina
    this.utilidades.carregando("Aguarde...", 2000);
    this.DataBase.getItem().subscribe(results => this.listaProdutos = results);
  }   

  //Metodo do botao excluir
  deletar(id: number){

    try{
      this.DataBase.delItem(id);  
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
            this.DataBase.statusItem(item);
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
