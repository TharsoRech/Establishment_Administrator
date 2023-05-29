import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { DashBoardComponent } from './Pages/DashBoard/DashBoard.component';
import { AppComponent } from './app.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { HomeComponent } from './Pages/Home/home.component'
import { ErrorInterceptor } from './Core/Middlewares/ErrorInterceptor';
import { JwtInterceptor} from './Core/Middlewares/JwtInterceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './Core/Services/AuthenticationService';
import { InicioComponent } from './Pages/DashBoardPages/inicio/inicio.component';
import { PontosComponent } from './Pages/DashBoardPages/pontos/pontos.component';
import { PerfilComponent } from './Pages/DashBoardPages/perfil/perfil.component';
import { ConfiguracoesComponent } from './Pages/DashBoardPages/configuracoes/configuracoes.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LojaComponent } from './Pages/DashboardPages/loja/loja.component';
import { EditarCupomComponent } from './Pages/DashBoardPages/EditarCupom/EditarCupom.component';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    PageNotFoundComponent,
    HomeComponent,
    InicioComponent,
    PontosComponent,
    PerfilComponent,
    ConfiguracoesComponent,
    LojaComponent,
    EditarCupomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    Ng2SearchPipeModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
