import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../Core/Services/AuthenticationService';
import { Ponto} from '../../../Core/Models/Ponto';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-pontos',
  templateUrl: './pontos.component.html',
  styleUrls: ['./pontos.component.scss']
})
export class PontosComponent implements OnInit {
  public page = 1;
  public pageSize = 10
  public pontosList: Array<Ponto> = [];
  public AllpontosList: Array<Ponto> = [];
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.pontosList = this.authenticationService.BuscarPontos();
    this.AllpontosList = this.pontosList;
  }

  applyFilter(filterValue: any) {
    let filterValueLower = filterValue.target.value.toLowerCase();
    if(filterValue === '' ) {
        this.pontosList=this.AllpontosList;
    } 
    else {
      this.pontosList = this.AllpontosList.filter((val) =>val.Cliente.toLowerCase().includes(filterValueLower) ||
      val.Cpf.toLowerCase().includes(filterValueLower) || val.Pontos.toLowerCase().includes(filterValueLower)
      || val.ValorCompra.toLowerCase().includes(filterValueLower)|| val.EfetividaEm.toLowerCase().includes(filterValueLower));
    }
 }

}
