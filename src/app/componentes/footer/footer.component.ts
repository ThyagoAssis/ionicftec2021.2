import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/servico/database.service';
import { FirebaseService } from 'src/app/servico/firebase.service';
import { UtilityService } from 'src/app/servico/utility.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(
     //Nosso serviço de banco de dados (json-server)
     //private DataBase: DatabaseService,

     //Serviço de banco de dados Firebase
     private firebase: FirebaseService,

     //alertController - Ferramente que cria um alert
     private alertCtrl: AlertController,
      //Serviço de utilidades 
    private utilidades: UtilityService   
  ) { }

  ngOnInit() {}


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
            this.utilidades.toastando('Cancelado!', "middle",2000 ,"secondary" );
          }
        },

        //Botão de cadastrar
        {
          text: 'Cadastrar',
          handler: (form) => {
            //Objeto que irá forma nosso item da lista
            let item = {
              produto: form.item,
              quantidade: form.qtd, 

              //Vai ser a variavel de controle do ngIf
              status: false     
            };

            //Cadastra no banco de dados
            try{
              //this.DataBase.postItem(item);
              this.firebase.cadastro(item);
            }catch(err){
              console.log(err)
            }finally{
              this.utilidades.toastando("Item Cadastrado", "top", 2000,"success");                           
            } 
          }
        }
      ]
    });

    (await alert).present();
  }

}
