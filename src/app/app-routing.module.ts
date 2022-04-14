import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterOrganisationComponent } from './ajouter-organisation/ajouter-organisation.component';
import { GererComptesComponent } from './CPM/gerer-comptes/gerer-comptes.component';
import { GestionUtulisateurComponent } from './CPM/gestion-utulisateur/gestion-utulisateur.component';
import { NouveauSecteurComponent } from './CPM/nouveau-secteur/nouveau-secteur.component';
import { SecteurComponent } from './CPM/secteur/secteur.component';
import { SendEmailUserComponent } from './CPM/send-email-user/send-email-user.component';
import { UserDetailComponent } from './CPM/user-detail/user-detail.component';
import { DetailComponent } from './detail/detail.component';

//import { ArticlespecifieeComponent } from './espaceMyCPM/articlespecifiee/articlespecifiee.component';
//import { DetailOrganisationComponent } from './espaceMyCPM/detail-organisation/detail-organisation.component';

import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminCPMGuard } from './guards/admin-cpm.guard';
import { AdminMYCPMGuard } from './guards/admin-mycpm.guard';
import { DemandeComponent } from './Inscription/demande/demande.component';
import { DoinscriptionComponent } from './Inscription/doinscription/doinscription.component';
import { FileUploadComponent } from './Inscription/file-upload/file-upload.component';
import { FirstInscriptionComponent } from './Inscription/first-inscription/first-inscription.component';
import { FirstPageComponent } from './Inscription/first-page/first-page.component';
import { InscriptionetdemandesComponent } from './Inscription/inscriptionetdemandes/inscriptionetdemandes.component';
import { ListeDemandesComponent } from './Inscription/liste-demandes/liste-demandes.component';
import { LoginComponent } from './Inscription/login/login.component';
import { OneDemandeComponent } from './Inscription/one-demande/one-demande.component';
import { RegisterComponent } from './Inscription/register/register.component';
import { SendMailComponent } from './Inscription/send-mail/send-mail.component';
import { WorningEmailComponent } from './Inscription/worning-email/worning-email.component';


import { MenuComponent } from './menu/menu.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { GestionMetiersComponent } from './sectionOrganisation/gestion-metiers/gestion-metiers.component';
import { ArticleComponent } from './Articles/article/article.component';
import { TypesComponent } from './Articles/types/types.component';
import { ConsulterMarcheesComponent } from './Marchee/consulter-marchees/consulter-marchees.component';
import { SecteursComponent } from './CPM/secteurs/secteurs.component';
import { MenuMycpmComponent } from './espaceMyCPM/menu-mycpm/menu-mycpm.component';
import { MarcheeComponent } from './Marchee/marchee/marchee.component';
import { EntreprisesComponent } from './sectionOrganisation/entreprises/entreprises.component';
import { DetailOrganisationComponent } from './sectionOrganisation/detail-organisation/detail-organisation.component';


import { AjouterattachementComponent } from './attachement/ajouterattachement/ajouterattachement.component';

import { ArticlespecifieeComponent } from './Marchee/articlespecifiee/articlespecifiee.component';
import { ConnsulterAttachementComponent } from './Attachement/connsulter-attachement/connsulter-attachement.component';


import { UserProfileComponent } from './Inscription/user-profile/user-profile.component';

import { ArticlespecifieeComponent } from './Marchee/articlespecifiee/articlespecifiee.component';
import { DetailBonDeCommandeComponent } from './attachement/detail-bon-de-commande/detail-bon-de-commande.component';
import { DeeeetailBCComponent } from './attachement/deeeetail-bc/deeeetail-bc.component';

const routes: Routes = [
  {path:'firstPage',component:FirstPageComponent},
  { path:'sendToUser/:id',component:SendEmailUserComponent},
  {path:'inscritEmployee',component:FirstInscriptionComponent},
  {path:'passerdemande',component:DoinscriptionComponent},
  {path:'upload',component:FileUploadComponent},
  {path:'nouveauSecteur',component:NouveauSecteurComponent},
  {path:'warningMail/:id',component:WorningEmailComponent},
  {path:'DemandeDetail/:id',component:OneDemandeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'send/:id',component:SendMailComponent},
  {path: 'forbidden', component:ForbiddenComponent},
  {path:'userDetail/:id',component:UserDetailComponent},
  {path:'mycpm/inscritEmployee',component:FirstInscriptionComponent},
  { path:'DetailOrg/:id',component:DetailOrganisationComponent},
 
 
   { path:'cpm',component:MenuComponent,children:[
    { path:'userProfile',component:UserProfileComponent},
    { path:'addOrganisation',component:AjouterOrganisationComponent,canActivate:[AdminCPMGuard]},
    { path:'organisations',component:OrganisationComponent,canActivate:[AdminCPMGuard]},
    { path:'detail',component:DetailComponent,canActivate:[AdminCPMGuard]},
    { path:'secteur',component:SecteurComponent,canActivate:[AdminCPMGuard]},
    {path:'Demande',component:DemandeComponent,canActivate:[AdminCPMGuard]},
    {path:'gererComptes',component:GererComptesComponent,canActivate:[AdminCPMGuard]},
    {path:'listeDemande',component:ListeDemandesComponent,canActivate:[AdminCPMGuard]},
    {path:'gestionUtulisateur',component:GestionUtulisateurComponent},
    {path:'table',component:FileUploadComponent},
     {path:'metiers',component:GestionMetiersComponent},
    {path:'secteurs',component:SecteursComponent}
    
   

   


  ]},
 
  { path:'mycpm',component:MenuMycpmComponent,children:[
    { path:'marchee',component:MarcheeComponent},
    { path:'detailOrganisation',component:DetailOrganisationComponent},
    {path:'gererComptes',component:GererComptesComponent},
    { path:'entreprises',component:EntreprisesComponent},
    { path:'articlesSpecifiees/:id',component:ArticlespecifieeComponent},
    { path:'metiers',component:GestionMetiersComponent},
    { path:'articles',component:ArticleComponent},
    { path:'types',component:TypesComponent},
    { path:'consulterMarchees',component:ConsulterMarcheesComponent},
    { path:'ajouterAttachement',component:AjouterattachementComponent},
    { path:'userProfilemycpm',component:UserProfileComponent},
   
    { path:'detailBondeCommande/:id',component:DetailBonDeCommandeComponent},
    { path:'detailBC/:id',component:DeeeetailBCComponent},
    { path:'consulterAttachements',component:ConnsulterAttachementComponent}
  ]},
    {path:'',redirectTo:'firstPage',pathMatch:'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
