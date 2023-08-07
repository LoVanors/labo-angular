import {Component} from '@angular/core';
import {AuthService} from "../core/services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDTO} from "../members/models/userDTO";
import {LoginDTO} from "../core/models/loginDTO";
import {tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  logs: LoginDTO = {username: '', password: ''};
  connectionInfo: boolean = true;

  constructor(private _authServ: AuthService,
              private _FB: FormBuilder,
              private _router: Router) {
    this.loginForm = this._FB.group(
      {
        username: [null, [Validators.required]],
        password: [null, [Validators.required]]
      }
    )
  }

  login() {
    if (this.loginForm.valid) {
      this.logs.username = this.loginForm.get("username")?.value;
      this.logs.password = this.loginForm.get("password")?.value;
      this._authServ.connect(this.logs.username, this.logs.password).pipe(
        tap(() => this._router.navigateByUrl('/home'))
      ).subscribe(
        (data) => {
          localStorage.setItem("token", JSON.stringify(data));
        }
      )
    }else {
      this.connectionInfo = !this.connectionInfo;
    }
  }
}
