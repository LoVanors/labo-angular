import { CanActivateFn } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

// Définition d'un garde de rôle personnalisé
export const roleGuard: CanActivateFn = () => {
  // Récupère une instance du service AuthService en utilisant la fonction inject
  const authServ: AuthService = inject(AuthService);

  // Vérifie si un token d'authentification existe et si le rôle de l'utilisateur est "Admin"
  return authServ.getToken()?.user.role === "Admin";
};
