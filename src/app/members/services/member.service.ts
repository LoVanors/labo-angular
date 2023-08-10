import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {MemberFormDTO} from "../models/memberFormDTO";
import {environment} from "../../environments/environment";
import {ChangePasswordDTO} from "../../core/models/changePasswordDTO";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private _http: HttpClient) {
  }

  createNewMember(newMember: MemberFormDTO): Observable<MemberFormDTO> {
    return this._http.post<MemberFormDTO>(`${environment.apiURL}/Member`, newMember);
  }

  editPassword(newPass: ChangePasswordDTO): Observable<ChangePasswordDTO> {
    return this._http.patch<ChangePasswordDTO>(`${environment.apiURL}/Member/password`, newPass);
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this._http.head<void>(`${environment.apiURL}/Member/existsUsername?Username=${username}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this._http.head<void>(`${environment.apiURL}/Member/existsEmail?Email=${email}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
