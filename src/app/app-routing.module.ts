import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterOrganisationComponent } from './ajouter-organisation/ajouter-organisation.component';
import { DetailComponent } from './detail/detail.component';
import { EntreprisePopupComponent } from './entreprise-popup/entreprise-popup.component';
import { ArticlespecifieeComponent } from './espaceMyCPM/articlespecifiee/articlespecifiee.component';
import { DetailOrganisationComponent } from './espaceMyCPM/detail-organisation/detail-organisation.component';
import { EntreprisesComponent } from './espaceMyCPM/entreprises/entreprises.component';
import { MarcheeComponent } from './espaceMyCPM/marchee/marchee.component';
import { DemandeComponent } from './Inscription/demande/demande.component';
import { DoinscriptionComponent } from './Inscription/doinscription/doinscription.component';
import { FirstPageComponent } from './Inscription/first-page/first-page.component';
import { ListeDemandesComponent } from './Inscription/liste-demandes/liste-demandes.component';
import { LoginComponent } from './Inscription/login/login.component';
import { OneDemandeComponent } from './Inscription/one-demande/one-demande.component';
import { RegisterComponent } from './Inscription/register/register.component';
import { SendMailComponent } from './Inscription/send-mail/send-mail.component';
import { MenuMycpmComponent } from './menu-mycpm/menu-mycpm.component';
import { MenuComponent } from './menu/menu.component';
import { OrganisationComponent } from './organisation/organisation.component';

const routes: Routes = [
  {path:'',component:OneDemandeComponent},
  {path:'aa',component:FirstPageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'Demande',component:DemandeComponent,children:[
    {path:'inscrire',component:DoinscriptionComponent}
  ]},
  {path:'send',component:SendMailComponent},
  { path:'cpm/:id',component:MenuComponent,children:[
    { path:'addOrganisation',component:AjouterOrganisationComponent},
    { path:'organisations',component:OrganisationComponent},
    { path:'detail',component:DetailComponent},
    {path:'Demande',component:DemandeComponent},
    {path:'listeDemande',component:ListeDemandesComponent},
   

  ]},
  { path:'mycpm',component:MenuMycpmComponent,children:[
    { path:'marchee',component:MarcheeComponent},
    { path:'popup',component:EntreprisePopupComponent},
    { path:'detailOrganisation',component:DetailOrganisationComponent},
    { path:'entreprises',component:EntreprisesComponent},
    { path:'articlesSpecifiees',component:ArticlespecifieeComponent}

  ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
