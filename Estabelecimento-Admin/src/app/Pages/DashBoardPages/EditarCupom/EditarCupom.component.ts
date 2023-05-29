import { Component, OnInit,Input } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import {Cupom} from '../../../Core/Models/Cupom';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { AuthenticationService } from '../../../Core/Services/AuthenticationService';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-EditarCupom',
  templateUrl: './EditarCupom.component.html',
  styleUrls: ['./EditarCupom.component.scss']
})
export class EditarCupomComponent implements OnInit {
  @Input() public SelectCupom: Cupom;
  cumpomForm: FormGroup;
  loading = false;
  submitted = false;
  sucesso= false;
  inserirCupomComErro= false;
  Alteracao: string;
  returnUrl: string;
  titulo:string = "Adicionar Cupom";
  error = '';
  selected: boolean = true;
  mostraAlteracao:boolean = false;
 

  constructor(private formBuilder: FormBuilder,private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.cumpomForm = this.formBuilder.group({
      Nome: ['', Validators.required],
      Valor: ['', Validators.required],
      Desconto:['', Validators.required],
      Ativo:[true,Validators.required]
  });
  this.Alteracao = "";
  if(this.SelectCupom != null && this.SelectCupom.EstablishmentId != "0"){
    this.cumpomForm.get("Nome")?.setValue(this.SelectCupom.Name, { emitEvent: false });
    this.cumpomForm.get("Valor")?.setValue(this.SelectCupom.Value, { emitEvent: false });
    this.cumpomForm.get("Desconto")?.setValue(this.SelectCupom.DescountPercent, { emitEvent: false });
    this.cumpomForm.get("Ativo")?.setValue(this.SelectCupom.Ativo, { emitEvent: false });
    this.Alteracao = this.SelectCupom.CreatedAt;
    this.selected = this.SelectCupom.Ativo;
    this.titulo = "Editar Cupom";
    this.mostraAlteracao = true;
  }
  else{
    this.cumpomForm.get("Nome")?.setValue("", { emitEvent: false });
    this.cumpomForm.get("Valor")?.setValue("", { emitEvent: false });
    this.cumpomForm.get("Desconto")?.setValue("", { emitEvent: false });
    this.cumpomForm.get("Ativo")?.setValue(false, { emitEvent: false });
    this.selected = true;
    this.mostraAlteracao = false;
  }
  }

  get f() { return this.cumpomForm.controls; }

  onSubmit() {
    this.submitted = true;
  
    // stop here if form is invalid
    if (this.cumpomForm.invalid) {
        return;
    }
  
    this.loading = true;

    if(this.SelectCupom != null){
      this.authenticationService.EditarCupom(this.SelectCupom.EstablishmentId,this.f.Nome.value, this.f.Valor.value,this.f.Desconto.value,this.selected)
      .pipe(first())
      .subscribe(
          data => {
            if(data.success){
              this.sucesso = true;
            }
            else{
              this.error = "Erro ao salvar Cupom : " + data.message;
              this.inserirCupomComErro= true;
            }
          },
          error => {
              this.error = error;
              this.loading = false;
              this.inserirCupomComErro= true;
          });

    }
    else{
      this.authenticationService.AdicionarCupom(this.f.Nome.value, this.f.Valor.value,this.f.Desconto.value,this.selected)
      .pipe(first())
      .subscribe(
          data => {
            if(data.success){
              this.sucesso = true;
            }
            else{
              this.error = "Erro ao salvar Cupom : " + data.message;
              this.inserirCupomComErro= true;
            }
          },
          error => {
              this.error = error;
              this.loading = false;
              this.inserirCupomComErro= true;
          });
    }
  }

  onReset() {
    this.loading = false;
    this.submitted = false;
    this.sucesso= false;
    this.inserirCupomComErro= false;
     this.cumpomForm.reset();
  }
  
}
