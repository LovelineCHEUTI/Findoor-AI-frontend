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
    { validators: Register.motsDePasseIdentiques }
  );

  /**
   * Raccourci pour accéder aux champs du formulaire depuis le HTML.
   * Sans ça, on devrait écrire "registerForm.controls['email']" partout
   * dans le template. Avec "f", on écrit juste "f['email']" — plus court
   * et plus lisible.
   */
  get f() {
    return this.registerForm.controls;
  }

  private static motsDePasseIdentiques(control: AbstractControl): ValidationErrors | null {
    const motDePasse = control.get('motDePasse')?.value;
    const confirmation = control.get('confirmationMotDePasse')?.value;

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
