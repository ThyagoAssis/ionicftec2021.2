import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/servico/auth.service';
import { resourceLimits } from 'worker_threads';
import { UtilityService } from '../../servico/utility.service';

@Component({
  selector: 'app-logar',
  templateUrl: './logar.page.html',
  styleUrls: ['./logar.page.scss'],
})
export class LogarPage implements OnInit {
  
  nameButton = "Logar";
  registerButton = "Registrar";

  //Tipar os dados do formulario
  form: FormGroup;
  
 constructor(
    //Serviço de autenticação criado por nois
    private authencation: AuthService,

    //Ferramenta de validação do formulario
    private formBuilder: FormBuilder,

    private router: Router,
    private message: UtilityService
  ) { }

  ngOnInit() {

    //Executa o método na inicialização da pagina logar
    this.validaForm();
    this.authencation.getAuth().user.subscribe(results => {
      localStorage.setItem('userId', results.uid );
    });
    
  }

  //Método de criação e validação do formulario
  validaForm(){
    this.form = this.formBuilder.group({
      nome: [''],
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  //Metodo do botão resgistrar
  mudaButton(){
    if(this.nameButton == "Logar"){
      this.nameButton = "Registrar";
      this.registerButton = "Logar"
    }else{
      this.nameButton = "Logar";
      this.registerButton = "Registrar";
    }    
  }

  //Metodo chamado pelo botão submit do formulario
  formulario(){
    if(this.nameButton == 'Logar'){    

        this.authencation.loginUser(this.form.value);
        console.log(localStorage.getItem('name'))
        console.log(localStorage.getItem('userId'))

    }else if(this.nameButton == 'Registrar'){
      
      this.authencation.createUser(this.form.value);
      localStorage.setItem('name', this.form.value.nome);    

    }else{
      console.log('Operação Desconhecida!');
    }
    
    


        
  }



 
}
