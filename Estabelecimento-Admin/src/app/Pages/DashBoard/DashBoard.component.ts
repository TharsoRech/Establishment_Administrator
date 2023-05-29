import { Component, Inject, OnInit,ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../Core/Models/user';
import { BehaviorSubject, Observable , throwError } from 'rxjs';

@Component({
  selector: 'app-DashBoard',
  templateUrl: './DashBoard.component.html',
  styleUrls: ['./DashBoard.component.css']
})


export class DashBoardComponent implements OnInit {
  SideBarExpanded: boolean = false;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  Inicio: boolean = true;
  public usuario:User;
  Pontos: boolean = false;
  Perfil: boolean = false;
  Configuracoes: boolean = false;
  Loja: boolean = false;
  CurrentRoot: string = "Inicio";

  constructor(private cookieService: CookieService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.cookieService.get('currentUser')) as unknown as User);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit(): void {
    document.body.style.backgroundColor = "#1d3d5b";
    this.usuario = this.currentUserSubject.value as User;
  }

  toggleSidebar () {
   this.SideBarExpanded = !this.SideBarExpanded;
}

MudarRotaDash(rootpath: any) {
  rootpath.preventDefault()
  this.CurrentRoot = rootpath.srcElement.parentElement.innerText;
  if (this.CurrentRoot.indexOf("Inicio") > -1) {
    this.Inicio = true;
    this.Pontos = false;
    this.Perfil = false;
    this.Loja = false;
    this.Configuracoes = false;
  }
  if (this.CurrentRoot.indexOf("Pontos") > -1) {
    this.Inicio = false;
    this.Pontos = true;
    this.Perfil = false;
    this.Loja = false;
    this.Configuracoes = false;
  }
  if (this.CurrentRoot.indexOf("Perfil") > -1) {
    this.Inicio = false;
    this.Pontos = false;
    this.Perfil = true;
    this.Loja = false;
    this.Configuracoes = false;
  }
  if (this.CurrentRoot.indexOf("Loja") > -1) {
    this.Inicio = false;
    this.Pontos = false;
    this.Perfil = false;
    this.Loja = true;
    this.Configuracoes = false;
  }
}

ngOnDestroy(){
  document.body.style.backgroundColor = "";
}

Logout(){
  this.cookieService.delete( 'currentUser' , '/' );

}

}

