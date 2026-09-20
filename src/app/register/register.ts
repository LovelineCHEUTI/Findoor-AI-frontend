import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';

/**
 * Composant Register (inscription).
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private fb = new FormBuilder();

  registerForm: FormGroup = this.fb.group(
    {
      nomComplet: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(8)]],
      confirmationMotDePasse: ['', [Validators.required]],
      role: ['', [Validators.required]]
    },
    // Deuxième paramètre de fb.group() : les options du groupe entier.
    // "validators" s'applique au FormGroup complet, pas à un seul champ —
    // c'est exactement ce qu'il nous faut pour comparer deux champs.
    { validators: Register.motsDePasseIdentiques }
  );

  /**
   * Validateur personnalisé : vérifie que motDePasse et
   * confirmationMotDePasse ont la même valeur.
   *
   * Une fonction de validateur Angular reçoit le "control" (ici, le
   * FormGroup entier) et doit renvoyer :
   * - null                        → tout va bien, pas d'erreur
   * - un objet du type { xxx: true } → il y a une erreur nommée "xxx"
   *
   * "static" : on n'a pas besoin de "this" à l'intérieur, donc pas besoin
   * d'une instance de la classe pour l'utiliser.
   */
  private static motsDePasseIdentiques(control: AbstractControl): ValidationErrors | null {
    const motDePasse = control.get('motDePasse')?.value;
    const confirmation = control.get('confirmationMotDePasse')?.value;

    // Si l'un des deux champs est encore vide, on ne signale pas
    // d'erreur ici — Validators.required s'en charge déjà séparément.
    if (!motDePasse || !confirmation) {
      return null;
    }

    return motDePasse === confirmation ? null : { motsDePasseDifferents: true };
  }

  // --- Affichage / masquage des mots de passe ---

  protected motDePasseVisible = false;
  protected confirmationVisible = false;

  protected basculerMotDePasse(): void {
    this.motDePasseVisible = !this.motDePasseVisible;
  }

  protected basculerConfirmation(): void {
    this.confirmationVisible = !this.confirmationVisible;
  }

  /**
   * Appelée quand le formulaire est soumis (bouton "Créer mon compte").
   * Pour l'instant, on se contente d'afficher les valeurs dans la
   * console : le backend n'a pas encore d'endpoint /auth/register à
   * appeler, donc on ne peut pas encore envoyer une vraie requête.
   */
  onSubmit(): void {
    console.log('Formulaire soumis :', this.registerForm.value);
  }
}