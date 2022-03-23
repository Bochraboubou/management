import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterOrganisationComponent } from './ajouter-organisation/ajouter-organisation.component';
import { DetailComponent } from './detail/detail.component';
import { EntreprisePopupComponent } from './entreprise-popup/entreprise-popup.component';
import { ArticlespecifieeComponent } from './sectionOrganisation/articlespecifiee/articlespecifiee.component';
import { DetailOrganisationComponent } from './sectionOrganisation/detail-organisation/detail-organisation.component';
import { EntreprisesComponent } from './sectionOrganisation/entreprises/entreprises.component';
import { MarcheeComponent } from './espaceMyCPM/marchee/marchee.component';
import { DemandeComponent } from './Inscription/demande/demande.component';
import { FirstPageComponent } from './Inscription/first-page/first-page.component';
import { ListeDemandesComponent } from './Inscription/liste-demandes/liste-demandes.component';
import { LoginComponent } from './Inscription/login/login.component';
import { RegisterComponent } from './Inscription/register/register.component';
import { MenuMycpmComponent } from './espaceMyCPM/menu-mycpm/menu-mycpm.component';
import { MenuComponent } from './menu/menu.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { GestionMetiersComponent } from './sectionOrganisation/gestion-metiers/gestion-metiers.component';
import { ArticleComponent } from './Articles/article/article.component';


const routes: Routes = [
  {path:'',component:MenuMycpmComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'Demande',component:DemandeComponent},
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
    { path:'articlesSpecifiees',component:ArticlespecifieeComponent},
    { path:'metiers',component:GestionMetiersComponent},
    { path:'articles',component:ArticleComponent}

  ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
