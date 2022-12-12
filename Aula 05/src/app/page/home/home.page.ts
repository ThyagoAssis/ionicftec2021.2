import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

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
    //alertController - Ferramente que cria um alert
    private alertCtrl: AlertController,
    //Serviço de utilidades 
    private utilidades: UtilityService    
  ) {}

  ngOnInit(){
    //Carrega o metodo no inicio da pagina
    this.utilidades.carregando("Vasco Campeao", 2000);

    this.DataBase.getItem().subscribe(results => this.listaProdutos = results);
  }  

  //Método do alertando 
  async alertando(){
    const alert = this.alertCtrl.create({
      mode:'ios',
      header: 'Cadastro de Produtos',
      inputs:[
        {
          name: 'item',
          type: 'text',
          placeholder: 'Informe o Produto'
        },
        {
          name:'qtd',
          type: 'text',
          placeholder: 'Informe a Quantidade'
        }
      ],
      buttons: [

        //Botão de cancelar
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('CPF CANCELADO!');
          }
        },

        //Botão de cadastrar
        {
          text: 'Cadastrar',
          handler: (form) => {
            //Objeto que irá forma nosso item da lista
            let item = {
              produto: form.item,
              quantidade: form.qtd            
            };
            try{
              this.DataBase.postItem(item);
            }catch(err){
              console.log(err)
            }finally{
              this.utilidades.toastando("Item Cadastrado", "top", 2000,"success");
              //Atualiza a página
              setTimeout(this.refresh, 2000);
            }
            
            
            
          }
        }
      ]
    });

    (await alert).present();
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
      
    //Atualiza a página
      setTimeout(this.refresh, 2000);
    }  
  } 


  //metodo do reload
  refresh(){
    location.reload();
  }
}
