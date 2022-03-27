
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AjouterOrganisationComponent } from './ajouter-organisation/ajouter-organisation.component';
import { AddEntrepriseModalComponent } from './add-entreprise-modal/add-entreprise-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { EntreprisePopupComponent } from './entreprise-popup/entreprise-popup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OrganisationComponent } from './organisation/organisation.component';
import { DetailComponent } from './detail/detail.component';
import { MenuMycpmComponent } from './menu-mycpm/menu-mycpm.component';
import { MarcheeComponent } from './espaceMyCPM/marchee/marchee.component';
import { DetailOrganisationComponent } from './espaceMyCPM/detail-organisation/detail-organisation.component';
import { EntreprisesComponent } from './espaceMyCPM/entreprises/entreprises.component';
import { ArticlespecifieeComponent } from './espaceMyCPM/articlespecifiee/articlespecifiee.component';
import { LoginComponent } from './Inscription/login/login.component';
import { RegisterComponent } from './Inscription/register/register.component';
import { DemandeComponent } from './Inscription/demande/demande.component';
import { FirstPageComponent } from './Inscription/first-page/first-page.component';
import { ListeDemandesComponent } from './Inscription/liste-demandes/liste-demandes.component';
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


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AjouterOrganisationComponent,
    AddEntrepriseModalComponent,
    EntreprisePopupComponent,
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
    InboxComponent,
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
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
