import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { AlertController, LoadingController } from '@ionic/angular';

import { Produtos } from 'src/app/model/produto.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  image = "https://cdn.pixabay.com/photo/2015/02/23/20/53/tomatoes-646645_960_720.jpg";

  listaProdutos: Produtos[] = [];
  constructor(
    private http: HttpClient,

    //loadingController - Ferramenta do carregando
    private loadCtrl: LoadingController,

    //alertController - Ferramente que cria um alert
    private alertCtrl: AlertController
  ) {}

  ngOnInit(){
    //Carrega o metodo no inicio da pagina
    this.carregando();

    this.http.get<Produtos[]>('http://localhost:3000/lista').subscribe(results => this.listaProdutos = results);  
  }

  //Método do carregando (load)
  async carregando(){
    const load = this.loadCtrl.create({
      mode: 'ios',
      message: 'Aguarde...',
      duration: 2000
    });

    (await load).present(); 
   
  }

  //Método do alertando 
  async alertando(){
    const alert = this.alertCtrl.create({
      mode:'ios',
      header: 'Cadastro de Produtos',
      inputs:[
        {
          name: 'produto',
          type: 'text',
          placeholder: 'Informe o Produto'
        },
        {
          name:'quantidade',
          type: 'text',
          placeholder: 'Informe a Quantidade'
        }
      ],
      buttons: ['ok']
    });

    (await alert).present();
  }
}
