import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../Core/Services/AuthenticationService';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  pontosForm: FormGroup;
  loading = false;
  submitted = false;
  sucesso= false;
  inserirPontosComErro= false;
  returnUrl: string;
  error = 'Erro ao inserir Pontos';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
) { }

ngOnInit() {
  this.pontosForm = this.formBuilder.group({
      cpfCnpj: ['', Validators.required],
      pontos: ['', Validators.required]
  });

}

get f() { return this.pontosForm.controls; }

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.pontosForm.invalid) {
      return;
  }

  this.loading = true;
  this.authenticationService.AdicionarPontos(this.f.cpfCnpj.value, this.f.pontos.value)
      .pipe(first())
      .subscribe(
          data => {
            if(data.success){
              this.sucesso = true;
            }
            else{
              this.error = "Erro ao inserir Pontos : " + data.message;
              this.inserirPontosComErro= true;
            }
          },
          error => {
              this.error = error;
              this.loading = false;
              this.inserirPontosComErro= true;
          });
}

}
