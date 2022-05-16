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
//import { InscriptionetdemandesComponent } from './Inscription/inscriptionetdemandes/inscriptionetdemandes.component';
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
import { ArticlespecifieeComponent } from './Marchee/articlespecifiee/articlespecifiee.component';
import { UserProfileComponent } from './Inscription/user-profile/user-profile.component';
import { AjouterattachementComponent } from './attachement/ajouterattachement/ajouterattachement.component';
import { DetailBonDeCommandeComponent } from './attachement/detail-bon-de-commande/detail-bon-de-commande.component';
import { DeeeetailBCComponent } from './attachement/deeeetail-bc/deeeetail-bc.component';

import { ImprimerAttachementComponent } from './attachement/imprimer-attachement/imprimer-attachement.component';
import { PageGardeComponent } from './Inscription/page-garde/page-garde.component';
import { DemandeEnAttenteComponent } from './Inscription/demande-en-attente/demande-en-attente.component';
import { ListeEmployeesComponent } from './espaceMyCPM/liste-employees/liste-employees.component';
import { GessComponent } from './gess/gess.component';
import { AjouterOTComponent } from './attachement/ajouter-ot/ajouter-ot.component';
import { ConnsulterAttachementComponent } from './attachement/connsulter-attachement/connsulter-attachement.component';
import { ConsulterAttachementMCComponent } from './attachement/consulter-attachement-mc/consulter-attachement-mc.component';
import { DetailOTComponent } from './attachement/detail-ot/detail-ot.component';
import { AffichrListeOTmcComponent } from './attachement/MarcheeMC/affichr-liste-otmc/affichr-liste-otmc.component';
import { ConsulterOTComponent } from './attachement/MarcheeMC/consulter-ot/consulter-ot.component';
import { ListeOTComponent } from './attachement/MarcheeMC/liste-ot/liste-ot.component';
import { MCattachementComponent } from './attachement/mcattachement/mcattachement.component';
import { MCMarcheeComponent } from './attachement/mcmarchee/mcmarchee.component';

import { ConsulterMaterielComponent } from './espaceMyCPM/consulter-materiel/consulter-materiel.component';
import { ConsulterMaterielsMCComponent } from './espaceMyCPM/consulter-materiels-mc/consulter-materiels-mc.component';
import { AjouterBlmProjetComponent } from './BonLivraisonProjet/ajouter-blm-projet/ajouter-blm-projet.component';
import { AjouterBLmaCComponent } from './BonLivraisonMC/ajouter-blma-c/ajouter-blma-c.component';



const routes: Routes = [
  {path:'looog',component:ImprimerAttachementComponent},
  {path:'gess',component:GessComponent},
  // only for guess
  {path:'premierPage',component:PageGardeComponent},
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
  { path:'imprimerAttachement/:id',component:ImprimerAttachementComponent},

//cette page contient la nouvelle page login
  //{ path:'',component:ImprimerAttachementComponent},


   { path:'cpm',component:MenuComponent,children:[
    { path:'userProfile',component:UserProfileComponent},
    { path:'addOrganisation',component:AjouterOrganisationComponent,canActivate:[AdminCPMGuard]},
    { path:'organisations',component:OrganisationComponent,canActivate:[AdminCPMGuard]},
    { path:'detail',component:DetailComponent,canActivate:[AdminCPMGuard]},
    { path:'secteur',component:SecteurComponent,canActivate:[AdminCPMGuard]},
    {path:'Demande',component:DemandeComponent,canActivate:[AdminCPMGuard]},
    {path:'gererComptes',component:GererComptesComponent,canActivate:[AdminCPMGuard]},
    {path:'listeDemande',component:ListeDemandesComponent,canActivate:[AdminCPMGuard]},
    {path:'demandeEnAttente',component:DemandeEnAttenteComponent,canActivate:[AdminCPMGuard]},
    {path:'gestionUtulisateur',component:GestionUtulisateurComponent},
    {path:'table',component:FileUploadComponent},
     {path:'metiers',component:GestionMetiersComponent},
    {path:'secteurs',component:SecteursComponent},
    { path:'userProfilecpm',component:UserProfileComponent},
    
   

   


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
    { path:'listeEmployeeMycpm',component:ListeEmployeesComponent},
    { path:'detailBondeCommande/:id',component:DetailBonDeCommandeComponent},
    { path:'detailBC/:id',component:DeeeetailBCComponent},

    { path:'MCattachement/:id',component:MCattachementComponent},
    //{ path:'consulterAttachements',component:ConnsulterAttachementComponent},
    { path:'mcattachement',component:MCattachementComponent},
    { path:'MCmarchee',component:MCMarcheeComponent},
    { path:'listeOT/:id',component:ListeOTComponent},
    { path:'consulterOT',component:ConsulterOTComponent},
    { path:'McConsulterListeOT/:id',component:AffichrListeOTmcComponent},
    

    { path:'consulterAttachements',component:ConnsulterAttachementComponent},
    { path:'ajouterOT',component:AjouterOTComponent},
    { path:'detailOT/:id',component:DetailOTComponent},
    { path:'consulterAttachementsMC',component:ConsulterAttachementMCComponent},

    { path:'ajouterBLmP',component:AjouterBlmProjetComponent},
    
    { path:'ajouterBLmP/ajouterBLmP',component:AjouterBlmProjetComponent},
    { path:'ajouterBlMc',component:AjouterBLmaCComponent},
    { path:'ajouterBlMc/ajouterBlMc',component:AjouterBLmaCComponent},


    { path:'consulterBonsdeLivraisonsdeProjet',component:ConsulterMaterielComponent},
    { path:'consulterBonsdeLivraisonsdeMC',component:ConsulterMaterielsMCComponent},
    { path:'ajouterBLmP/:idBC/:idM',component:AjouterBlmProjetComponent},
    { path:'ajouterBLmMC/:idOT/:idM',component:AjouterBLmaCComponent}

  ]},
  

   {path:'',redirectTo:'premierPage',pathMatch:'full'}
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
