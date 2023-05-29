import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../Core/Services/AuthenticationService';
import * as CryptoJS from "crypto-js";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  md5:string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
) { }



  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}
  
get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    let senha = CryptoJS.MD5(this.f.password.value).toString();
    this.loading = true;
    this.authenticationService.login(this.f.username.value, senha)
        .pipe(first())
        .subscribe(
            data => {
              if(data.success){
                this.router.navigate(['/DashBoard']);
              }
              else{
                this.error = data.message;
                this.loading = false;
               }
            },
            error => {
                this.error = "Usuário ou senha incorretos";
                this.loading = false;
            });
}
}
