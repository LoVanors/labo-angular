import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MemberFormDTO} from "../models/memberFormDTO";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private _http: HttpClient) { }

  createNewMember(newMember: MemberFormDTO):Observable<MemberFormDTO>{
    return this._http.post<MemberFormDTO>(`${environment.apiURL}/Member`, newMember);
  }
}
