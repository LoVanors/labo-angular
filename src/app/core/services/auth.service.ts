import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, Subject, tap} from "rxjs";
import {TokenDTO} from "../models/tokenDTO";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _tokenSub: BehaviorSubject<TokenDTO | null>
  private userLoggedInSubject = new BehaviorSubject<boolean>(false);
  userLoggedin$: Observable<boolean> = this.userLoggedInSubject.asObservable();

  constructor(private _http: HttpClient) {
    const sessionToken = localStorage.getItem("token");
    this._tokenSub = new BehaviorSubject<TokenDTO | null>(sessionToken ? JSON.parse(sessionToken) : null);
  }

  connect(username: string, password: string): Observable<TokenDTO> {
    let loginInfo = {username, password};
    return this._http.post<TokenDTO>(`${environment.apiURL}/login`, loginInfo);
  }

  getToken() {
    return this._tokenSub.getValue();
  }

  removeToken() {
    localStorage.removeItem("token");
    this._tokenSub.next(null);
  }


}
