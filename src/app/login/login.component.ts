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
    logs: LoginDTO = {username:'',password:''};
    connectedUser?: UserDTO;

    constructor(private _authServ : AuthService,
                private _FB : FormBuilder,
                private _router : Router) {
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
            this._authServ.login(this.logs.username, this.logs.password).pipe(
                tap(() => this._router.navigateByUrl(''))
            ).subscribe(
                (data) => {
                    sessionStorage.setItem("token", JSON.stringify(data.token));
                    this.connectedUser = data.user;
                    if (this.connectedUser.username) {
                        sessionStorage.setItem("username", this.connectedUser.username)
                    }
                }
            )
console.log(this.connectedUser)
        }
    }
}
