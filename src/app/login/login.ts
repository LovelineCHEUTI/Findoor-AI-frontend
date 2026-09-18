import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',

  // ReactiveFormsModule → formulaire Angular
  // RouterLink → navigation vers /register et /
  // NgIf → nécessaire pour *ngIf dans le template (icône œil)
  imports: [ReactiveFormsModule, RouterLink, NgIf],

  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  // FormGroup = formulaire complet
  // Chaque FormControl = un champ du formulaire
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required
    ])
  });

  // true = mot de passe visible (type="text")
  // false = mot de passe masqué (type="password")
  showPassword = false;

  // Appelé quand on clique sur l'icône œil
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Exécuté lorsqu'on soumet le formulaire
  onSubmit() {
    console.log(this.loginForm.value);
  }
}