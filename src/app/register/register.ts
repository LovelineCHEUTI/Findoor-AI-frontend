import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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

  // On injecte Router pour pouvoir naviguer par le code dans onSubmit(),
  // comme on l'a fait pour la page d'accueil locataire.
  constructor(private router: Router) {}

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
   *
   * Pour l'instant, le backend n'a pas encore d'endpoint /auth/register
   * à appeler. On simule donc une inscription réussie en redirigeant
   * directement selon le rôle choisi — TEMPORAIRE, à remplacer plus
   * tard par un vrai appel HTTP qui attendra la réponse du serveur
   * avant de rediriger.
   */
  onSubmit(): void {
    console.log('Formulaire soumis :', this.registerForm.value);

    const role = this.registerForm.value.role;

    if (role === 'locataire') {
      this.router.navigate(['/locataire/accueil']);
    } else {
      // Cette route n'existe pas encore, on la créera à l'étape du module Propriétaire.
      this.router.navigate(['/proprietaire/dashboard']);
    }
  }
}