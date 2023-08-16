import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _authServ: AuthService) {
  }

  // Méthode d'interception des requêtes HTTP
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Obtient le token d'authentification depuis le service AuthService
    const token = this._authServ.getToken();

    // Vérifie si un token existe
    if (token) {
      // Crée un nouvel objet HttpHeaders avec l'en-tête d'autorisation
      let headers = new HttpHeaders();
      headers = headers.append('Authorization', `Bearer ${this._authServ.getToken()?.token}`);

      // Clone la requête d'origine en ajoutant les en-têtes personnalisés
      const newRequest = request.clone({
        headers: headers
      });

      // Passe la nouvelle requête au gestionnaire suivant
      return next.handle(newRequest);
    }

    // Si aucun token n'existe, passe simplement la requête au gestionnaire suivant
    return next.handle(request);
  }
}
