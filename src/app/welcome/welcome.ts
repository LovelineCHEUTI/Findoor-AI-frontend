import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Page Welcome (landing) de FINDOOR AI.
 *
 * Composant "standalone" : pas besoin de NgModule, il déclare lui-même
 * ses dépendances — ici juste RouterLink, pour les boutons /login et
 * /register.
 *
 * Cette page ne contient volontairement AUCUNE logique métier : pas
 * d'appel API, pas d'authentification, pas d'annonces dynamiques. Elle
 * est 100% présentationnelle, conformément au périmètre actuel du
 * projet (on ne construit que la vitrine pour l'instant).
 */
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {
  /**
   * Année courante, utilisée dans le "© {{ currentYear }}" du footer.
   * Calculée une seule fois à la création du composant : pas besoin de
   * la recalculer à chaque cycle de détection de changement d'Angular.
   */
  protected readonly currentYear = new Date().getFullYear();
}
