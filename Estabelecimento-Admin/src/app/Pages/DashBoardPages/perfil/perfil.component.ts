import { Component, Inject, OnInit,ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../../Core/Models/user';
import { AuthenticationService } from '../../../Core/Services/AuthenticationService';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable , throwError } from 'rxjs';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public usuario:User;
  configsForm: FormGroup;
  senhasForm: FormGroup;
  loading = false;
  submitted = false;
  submittedSenha = false;
  sucesso= false;
  sucessoSenha= false;
  salvarConfiguracoes= false;
  salvarSenha= false;
  returnUrl: string;
  error = 'Erro ao salvar configurações';
  errorSenha = 'Erro ao salvar senha';

  constructor(private cookieService: CookieService,private formBuilder: FormBuilder,    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.cookieService.get('currentUser')) as unknown as User);
    this.currentUser = this.currentUserSubject.asObservable();
   }

  ngOnInit(): void {
    this.usuario = this.currentUserSubject.value as User;
    this.configsForm = this.formBuilder.group({
      RazaoSocial: ['', Validators.required],
      CnpjCpf: ['', Validators.required],
      Telefone: ['', Validators.required],
      Cep: ['', Validators.required],
      Cidade: ['', Validators.required],
      Endereco: ['', Validators.required],
      Bairro: ['', Validators.required],
      Numero: ['', Validators.required],
      Uf:['', Validators.required],
      Complemento: ['', null]
  });
  this.senhasForm = this.formBuilder.group({
    password: ['', Validators.required],
    passwordNew: ['', Validators.required]
});
if(this.usuario != null){
  this.configsForm.get("RazaoSocial")?.setValue(this.usuario.razaoSocial, { emitEvent: false });
  this.configsForm.get("Telefone")?.setValue(this.usuario.phoneNumber, { emitEvent: false });
  this.configsForm.get("Cep")?.setValue(this.usuario.cep, { emitEvent: false });
  this.configsForm.get("Cidade")?.setValue(this.usuario.cidade, { emitEvent: false });
  this.configsForm.get("Endereco")?.setValue(this.usuario.endereco, { emitEvent: false });
  this.configsForm.get("Bairro")?.setValue(this.usuario.bairro, { emitEvent: false });
  this.configsForm.get("Numero")?.setValue(this.usuario.numero, { emitEvent: false });
  this.configsForm.get("Uf")?.setValue(this.usuario.uf, { emitEvent: false });
  if(this.usuario.complemento != null){
    this.configsForm.get("Complemento")?.setValue(this.usuario.complemento, { emitEvent: false });
  }
}
  }

  get f() { return this.configsForm.controls; }

  get f1() { return this.senhasForm.controls; }

  onSubmit() {
    this.submitted = true;
  
    // stop here if form is invalid
    if (this.configsForm.invalid) {
        return;
    }
  
    this.loading = true;
    this.authenticationService.AdicionarPontos(this.f.CnpjCpf.value, this.f.RazaoSocial.value)
        .pipe(first())
        .subscribe(
            data => {
              if(data.success){
                this.sucesso = true;
              }
              else{
                this.error = "Erro ao salvar configurações : " + data.message;
                this.salvarConfiguracoes= true;
              }
            },
            error => {
                this.error = error;
                this.loading = false;
                this.salvarConfiguracoes= true;
            });
  }

  onSubmit2() {
    this.submittedSenha = true;
  
    // stop here if form is invalid
    if (this.senhasForm.invalid) {
        return;
    }
  
    this.loading = true;
    this.authenticationService.AdicionarPontos(this.f1.password.value, this.f1.passwordNew.value)
        .pipe(first())
        .subscribe(
            data => {
              if(data.success){
                this.sucessoSenha = true;
              }
              else{
                this.errorSenha = "Erro ao alterar senha : " + data.message;
                this.salvarSenha= true;
              }
            },
            error => {
                this.errorSenha = error;
                this.loading = false;
                this.salvarSenha= true;
            });
  }

}
