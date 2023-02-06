import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogarPageRoutingModule } from './logar-routing.module';

import { LogarPage } from './logar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogarPageRoutingModule
  ],
  declarations: [LogarPage]
})
export class LogarPageModule {}
