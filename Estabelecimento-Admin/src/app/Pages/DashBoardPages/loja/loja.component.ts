import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../Core/Services/AuthenticationService';
import { Cupom} from '../../../Core/Models/Cupom';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.css']
})
export class LojaComponent implements OnInit {
   public cupomList: Array<Cupom> = [];
  public AllcupomList: Array<Cupom> = [];
  public SelectCupom: Cupom | null = null;
  public display:string = "none";
  public Status:string = "Desativado";

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.LoadPage()
  }

  applyFilter(filterValue: any) {
    let filterValueLower = filterValue.target.value.toLowerCase();
    if(filterValue === '' ) {
        this.cupomList=this.AllcupomList;
    } 
    else {
      this.cupomList = this.AllcupomList.filter((val) =>val.Value.toLowerCase().includes(filterValueLower) ||
      val.DescountPercent.toLowerCase().includes(filterValueLower) || val.Name.toLowerCase().includes(filterValueLower)
      || val.CreatedAt.toLowerCase().includes(filterValueLower));
    }
 }

LoadPage(){
  this.cupomList = this.authenticationService.BuscarCupoms();
  this.AllcupomList = this.cupomList;
}

EditModal(Id: string) {
  if(Id != "0"){
    this.SelectCupom = this.AllcupomList.find(x => x.EstablishmentId == Id)!;
    if(this.SelectCupom.Ativo){
      this.Status = "Ativado";
    }
  } 
  else{
    const cupom:Cupom = {
      EstablishmentId:"0",
      Name: "",
      Value: "",
      DescountPercent:"",
      CreatedAt:"",
      Image:"",
      DataInicio:"",
      DataFim:"",
      Ativo : true
    }
    this.SelectCupom = cupom;
  }
  this.display = "block";
}

onCloseHandled() {
  this.display = "none";
  this.SelectCupom = null;
  this.LoadPage()
}

}
