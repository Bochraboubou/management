
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AjouterOrganisationComponent } from './ajouter-organisation/ajouter-organisation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrganisationComponent } from './organisation/organisation.component';
import { DetailComponent } from './detail/detail.component';
import { MenuMycpmComponent } from './espaceMyCPM/menu-mycpm/menu-mycpm.component';
import { MarcheeComponent } from './Marchee/marchee/marchee.component';
import { DetailOrganisationComponent } from './sectionOrganisation/detail-organisation/detail-organisation.component';
import { EntreprisesComponent } from './sectionOrganisation/entreprises/entreprises.component';
import { ArticlespecifieeComponent } from './Marchee/articlespecifiee/articlespecifiee.component';
import { LoginComponent } from './Inscription/login/login.component';
import { RegisterComponent } from './Inscription/register/register.component';
import { DemandeComponent } from './Inscription/demande/demande.component';
import { FirstPageComponent } from './Inscription/first-page/first-page.component';
import { ListeDemandesComponent } from './Inscription/liste-demandes/liste-demandes.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPrintModule } from 'ngx-print';


import { ToastrModule } from 'ngx-toastr';

import { ConsulterMarcheesComponent } from './Marchee/consulter-marchees/consulter-marchees.component';
import { MetiersAdminComponent } from './CPM/metiers-admin/metiers-admin.component';
import { SecteursComponent } from './CPM/secteurs/secteurs.component';

import { InboxComponent } from './Inscription/inbox/inbox.component';
import { TableComponent } from './Inscription/table/table.component';
import { SendMailComponent } from './Inscription/send-mail/send-mail.component';
import { DoinscriptionComponent } from './Inscription/doinscription/doinscription.component';
import { OneDemandeComponent } from './Inscription/one-demande/one-demande.component';
import { WorningEmailComponent } from './Inscription/worning-email/worning-email.component';
import { SecteurComponent } from './CPM/secteur/secteur.component';
import { DetailSecteurComponent } from './CPM/detail-secteur/detail-secteur.component';
import { FileUploadComponent } from './Inscription/file-upload/file-upload.component';
import { NouveauSecteurComponent } from './CPM/nouveau-secteur/nouveau-secteur.component';
import { ListesUtulisateurComponent } from './listes-utulisateur/listes-utulisateur.component';
import { FirstInscriptionComponent } from './Inscription/first-inscription/first-inscription.component';
import { GererComptesComponent } from './CPM/gerer-comptes/gerer-comptes.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { InscriptionetdemandesComponent } from './Inscription/inscriptionetdemandes/inscriptionetdemandes.component';
import { GestionUtulisateurComponent } from './CPM/gestion-utulisateur/gestion-utulisateur.component';
import { UserDetailComponent } from './CPM/user-detail/user-detail.component';
import { SendEmailUserComponent } from './CPM/send-email-user/send-email-user.component';
import { TypesComponent } from './Articles/types/types.component';
import { ArticleComponent } from './Articles/article/article.component';
import { GestionMetiersComponent } from './sectionOrganisation/gestion-metiers/gestion-metiers.component';
import { UserProfileComponent } from './Inscription/user-profile/user-profile.component';

import { AjouterattachementComponent } from './attachement/ajouterattachement/ajouterattachement.component';
import { DetailBonDeCommandeComponent } from './attachement/detail-bon-de-commande/detail-bon-de-commande.component';

import { DeeeetailBCComponent } from './attachement/deeeetail-bc/deeeetail-bc.component';
import { ImprimerAttachementComponent } from './attachement/imprimer-attachement/imprimer-attachement.component';
import { PageGardeComponent } from './Inscription/page-garde/page-garde.component';
import { DemandeEnAttenteComponent } from './Inscription/demande-en-attente/demande-en-attente.component';
import { ListeEmployeesComponent } from './espaceMyCPM/liste-employees/liste-employees.component';
import { GessComponent } from './gess/gess.component';



import { MCattachementComponent } from './attachement/mcattachement/mcattachement.component';
import { MCMarcheeComponent } from './attachement/mcmarchee/mcmarchee.component';
import { ListeOTComponent } from './attachement/MarcheeMC/liste-ot/liste-ot.component';

import { ConsulterOTComponent } from './attachement/MarcheeMC/consulter-ot/consulter-ot.component';
import { AffichrListeOTmcComponent } from './attachement/MarcheeMC/affichr-liste-otmc/affichr-liste-otmc.component';
import { AjouterOTComponent } from './attachement/ajouter-ot/ajouter-ot.component';
import { ConsulterAttachementMCComponent } from './attachement/consulter-attachement-mc/consulter-attachement-mc.component';
import { DetailOTComponent } from './attachement/detail-ot/detail-ot.component';




import { DatePipe } from '@angular/common';
import { ConnsulterAttachementComponent } from './attachement/connsulter-attachement/connsulter-attachement.component';
import { ConsulterMaterielComponent } from './espaceMyCPM/consulter-materiel/consulter-materiel.component';
import { AjouterBLmaCComponent } from './BonLivraisonMC/ajouter-blma-c/ajouter-blma-c.component';
import { AjouterBlmProjetComponent } from './BonLivraisonProjet/ajouter-blm-projet/ajouter-blm-projet.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AjouterOrganisationComponent,
    OrganisationComponent,
    DetailComponent,
    MenuMycpmComponent,
    MarcheeComponent,
    DetailOrganisationComponent,
    EntreprisesComponent,
    ArticlespecifieeComponent,
    LoginComponent,
    RegisterComponent,
    DemandeComponent,
    FirstPageComponent,
    ListeDemandesComponent,

    GestionMetiersComponent,
    ArticleComponent,
    TypesComponent,
    ConsulterMarcheesComponent,
    MetiersAdminComponent,
    SecteursComponent,
 
    TableComponent,
    SendMailComponent,
    DoinscriptionComponent,
    OneDemandeComponent,
    WorningEmailComponent,
    SecteurComponent,
    DetailSecteurComponent,
    FileUploadComponent,
    NouveauSecteurComponent,
    ListesUtulisateurComponent,
    FirstInscriptionComponent,
    GererComptesComponent,
    ForbiddenComponent,
    InscriptionetdemandesComponent,
    GestionUtulisateurComponent,
    UserDetailComponent,
    SendEmailUserComponent,
    



InboxComponent,

SendMailComponent,
DoinscriptionComponent,
OneDemandeComponent,
WorningEmailComponent,
SecteurComponent,
DetailSecteurComponent,
FileUploadComponent,
NouveauSecteurComponent,
ListesUtulisateurComponent,
FirstInscriptionComponent,
GererComptesComponent,

AjouterattachementComponent,








ForbiddenComponent,
InscriptionetdemandesComponent,
GestionUtulisateurComponent,
UserDetailComponent,
SendEmailUserComponent,
UserProfileComponent,
DetailBonDeCommandeComponent,
DeeeetailBCComponent,

  ImprimerAttachementComponent,
  PageGardeComponent,
  DemandeEnAttenteComponent,
  ListeEmployeesComponent,
  GessComponent,


ConnsulterAttachementComponent,

    MCattachementComponent,
    MCMarcheeComponent,
    ListeOTComponent,
    ConsulterOTComponent,
    AffichrListeOTmcComponent,

AjouterOTComponent,
DetailOTComponent,
ConsulterAttachementMCComponent,
ConsulterMaterielComponent,
AjouterBLmaCComponent,
AjouterBlmProjetComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    NgxPrintModule,
    ToastrModule.forRoot(),

MatToolbarModule,
MatIconModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
