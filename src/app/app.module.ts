import { NgModule } from '@angular/core';
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
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
