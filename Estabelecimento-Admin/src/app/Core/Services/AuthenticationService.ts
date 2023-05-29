import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable , throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Result } from '../Models/Result';
import { User } from '../Models/user';
import { LoginDto} from '../Models/LoginDto';
import { PontosDto } from '../Models/PontosDto';
import { CupomCreateDto } from '../Models/CupomCreateDto';
import { CupomEditDto } from '../Models/CupomEditDto';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    baseURL: string = "http://gralha.nuvemidc.com:6402/api/";

    constructor(private http: HttpClient,private cookieService: CookieService) {
        this.currentUserSubject = new BehaviorSubject<User>(this.cookieService.get('currentUser') as unknown as User);
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) : Observable<Result>{
        let headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'});
        const rememberUser:LoginDto = {
            cnpj: username,
            passwordHash: password
          }
        return this.http.post<Result>(`${this.baseURL}Establishment/authenticate`, JSON.stringify(rememberUser),{ headers: headers })
            .pipe(map(user => {
                if (user.data!= null && user.data.token != null) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.currentUserSubject.next(user.data);
                    user.data.cpfCnpj = username;
                    this.currentUser = user.data;
                    this.cookieService.set('currentUser', JSON.stringify(user.data));
                }
                return user;
            }));
    }

    AdicionarPontos(cpfCnpj: string, pontos: number): Observable<Result> {
        let headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'});
        const Pontos:PontosDto = {
            cpf: cpfCnpj,
            valueNf: pontos
          }
        return this.http.post<Result>(`${this.baseURL}Establishment/create-point-balance`, JSON.stringify(Pontos),{ headers: headers })
            .pipe(map(result => {
                return result;
            }));
    }

    AdicionarCupom(Nome: string, Valor: string,Desconto:string,Ativo:boolean): Observable<Result> {
        let headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'});
        const cupom:CupomCreateDto = {
            Name: Nome,
            Value: Number(Valor),
            DescountPercent:Number(Valor),
            Ativo:Ativo
          }
        return this.http.post<Result>(`${this.baseURL}Establishment/create-cupom`, JSON.stringify(cupom),{ headers: headers })
            .pipe(map(result => {
                return result;
            }));
    }

    EditarCupom(Id:string,Nome: string, Valor: string,Desconto:string,Ativo:boolean): Observable<Result> {
        let headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'});
        const cupom:CupomEditDto = {
            EstablishmentId:Id,
            Name: Nome,
            Value: Number(Valor),
            DescountPercent:Number(Desconto),
            Ativo:Ativo
          }
        return this.http.post<Result>(`${this.baseURL}Establishment/edit-cupom`, JSON.stringify(cupom),{ headers: headers })
            .pipe(map(result => {
                return result;
            }));
    }

    BuscarPontos(){
        let list = [];

        for (let index = 0; index < 74; index++) {
          list.push({Cliente : "Tharso Francisco Rech Curia:" + index.toString(), Cpf :"03029666093"+ index.toString(), Pontos: "30" + index.toString(), ValorCompra: "40" + index.toString(),EfetividaEm:"04/01/000"+ index.toString()});
        }
        return list;
    }

    BuscarCupoms(){
        let list = [];

        for (let index = 0; index < 100; index++) {
          list.push({Ativo:false,EstablishmentId : "21c43588-74f3-11ed-a1e6-6eb6ff8ee7db" + index.toString(), Value :"360.0"+ index.toString(), DescountPercent: index.toString(), Name: "Desconto de" + index.toString() + "%",CreatedAt:"04/01/000"+ index.toString(),Image:index.toString(),DataInicio:"10/01/000"+ index.toString(),DataFim:"19/01/000"+ index.toString()});
        }
        return list;
    }


    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        //this.currentUserSubject.next(null);
    }
}