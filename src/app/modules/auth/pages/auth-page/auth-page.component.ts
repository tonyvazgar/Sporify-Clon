import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  formLogin: FormGroup = new FormGroup({});
  @Input() errorSession: boolean = false;

  sendLogin(): void {
    const { email, password} = this.formLogin.value;
    this._authService.sendCredentials(email, password).subscribe(responseOk => {
      this.errorSession = false;
      console.log("Sesion iniciada correcta")
      this.cookie.set('token', responseOk.tokenSession, 4, '/')
      this.router.navigate(['', '/tracks'])
    }, error => {
      this.errorSession = true;
      console.log("Hubo un error xd")
    });
  }

  constructor(
    private _authService: AuthService,
    private cookie: CookieService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10)
        ])
      }
    )
  }
}
