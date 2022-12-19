import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  //Rotas filhas 
  
  {
    path: '',
    redirectTo: 'footer',
    pathMatch: 'full'
  },
  {
    path: 'footer',
    loadChildren: () => import('./componentes/footer/footer.module').then(m => m.FooterModule )
  },
  {
    path: 'form/:id',
    loadChildren: () => import('./page/form/form.module').then( m => m.FormPageModule)
  },

  //Rotas simples
  /* {path 'inicio', component: iniciocomponete} */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
