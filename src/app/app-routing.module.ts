import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterOrganisationComponent } from './ajouter-organisation/ajouter-organisation.component';
import { DetailComponent } from './detail/detail.component';
import { EntreprisePopupComponent } from './entreprise-popup/entreprise-popup.component';
import { DetailOrganisationComponent } from './espaceMyCPM/detail-organisation/detail-organisation.component';
import { EntreprisesComponent } from './espaceMyCPM/entreprises/entreprises.component';
import { MarcheeComponent } from './espaceMyCPM/marchee/marchee.component';
import { MenuMycpmComponent } from './menu-mycpm/menu-mycpm.component';
import { MenuComponent } from './menu/menu.component';
import { OrganisationComponent } from './organisation/organisation.component';

const routes: Routes = [
  { path:'',component:MenuComponent,children:[
    { path:'addOrganisation',component:AjouterOrganisationComponent},
    { path:'organisations',component:OrganisationComponent},
    { path:'detail',component:DetailComponent}

  ]},
  { path:'mycpm',component:MenuMycpmComponent,children:[
    { path:'marchee',component:MarcheeComponent},
    { path:'popup',component:EntreprisePopupComponent},
    { path:'detailOrganisation',component:DetailOrganisationComponent},
    { path:'entreprises',component:EntreprisesComponent},

  ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
