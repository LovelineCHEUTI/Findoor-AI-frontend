import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Welcome } from './welcome/welcome';
import { Register } from './register/register';

export const routes: Routes = [
  {
    // La route vide correspond à la page d'accueil "/"
    path: '',
    component: Welcome
  },
  {
    // "/login" affiche le composant Login
    path: 'login',
    component: Login
  },
  {
    // "/register" affiche le composant Register
    path: 'register',
    component: Register
  },
  {
  path: 'locataire/accueil',
  loadComponent: () =>
    import('./features/locataire/accueil-recherche/accueil-recherche')
      .then(m => m.AccueilRechercheComponent)
}
];