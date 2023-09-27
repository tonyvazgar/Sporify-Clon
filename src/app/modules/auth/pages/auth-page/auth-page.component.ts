import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';

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
    this._authService.sendCredentials(email, password);
  }

  constructor(private _authService: AuthService) {

  }

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
