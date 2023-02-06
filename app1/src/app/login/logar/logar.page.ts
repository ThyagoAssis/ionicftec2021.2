import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logar',
  templateUrl: './logar.page.html',
  styleUrls: ['./logar.page.scss'],
})
export class LogarPage implements OnInit {

  
  nameButton = "Logar";

  constructor() { }

  ngOnInit() {
   
  }

  mudaButton(){
    this.nameButton = "Resgistar";
  }

 
}
