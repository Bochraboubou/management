import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterOrganisationComponent } from './ajouter-organisation/ajouter-organisation.component';
import { DetailComponent } from './detail/detail.component';
import { EntreprisePopupComponent } from './entreprise-popup/entreprise-popup.component';
import { MenuComponent } from './menu/menu.component';
import { OrganisationComponent } from './organisation/organisation.component';

const routes: Routes = [
  { path:'',component:MenuComponent,children:[
    { path:'addOrganisation',component:AjouterOrganisationComponent},
    { path:'organisations',component:OrganisationComponent},
    { path:'detail',component:DetailComponent}

  ]},
  { path:'popup',component:EntreprisePopupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
