import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

// On décrit la structure d'une annonce avec une interface TypeScript.
// Ça sert juste à typer les données, pas à créer une vraie classe.
interface Annonce {
  id: number;
  titre: string;
  quartier: string;
  prix: number;
  type: string;
  scoreConfiance: number; // valeur de 0 à 100, cf. règle métier section 9.2 du CDC
}

@Component({
  selector: 'app-accueil-recherche',
  standalone: true,
  // CommonModule : nécessaire pour *ngFor, *ngIf, [ngClass], le pipe "number"
  // ReactiveFormsModule : nécessaire pour [formControl]
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './accueil-recherche.html',
  styleUrl: './accueil-recherche.css'
})
export class AccueilRechercheComponent {

  // Un seul champ de recherche : pas besoin d'un FormGroup complet ici,
  // un simple FormControl suffit (contrairement au Login/Register à plusieurs champs)
  rechercheControl = new FormControl('');

  // Données fictives en dur, en attendant que l'endpoint GET /api/v1/annonces
  // soit prêt côté backend. On les remplacera plus tard par un vrai appel HTTP.
  annoncesFictives: Annonce[] = [
    { id: 1, titre: 'Studio meublé proche université', quartier: 'Ngoa-Ekelle, Yaoundé', prix: 45000, type: 'Studio', scoreConfiance: 82 },
    { id: 2, titre: 'Appartement 2 chambres', quartier: 'Bastos, Yaoundé', prix: 120000, type: 'Appartement', scoreConfiance: 55 },
    { id: 3, titre: 'Chambre moderne avec salon', quartier: 'Mendong, Yaoundé', prix: 35000, type: 'Chambre', scoreConfiance: 25 },
    { id: 4, titre: 'Villa 4 pièces avec jardin', quartier: 'Bastos, Yaoundé', prix: 350000, type: 'Villa', scoreConfiance: 91 },
  ];

  // On injecte le Router dans le constructeur pour pouvoir naviguer par le code
  // (contrairement à RouterLink qui navigue depuis le HTML)
  constructor(private router: Router) {}

  // Appelée quand l'utilisateur clique sur "Rechercher" ou appuie sur Entrée
  onSearch(): void {
    const motCle = this.rechercheControl.value?.trim();

    // On navigue vers la page Résultats (pas encore codée) en passant
    // le mot-clé comme queryParam, ex: /locataire/resultats?q=bastos
    // Plus tard, cette page utilisera "q" pour appeler l'API avec ce filtre
    this.router.navigate(['/locataire/resultats'], {
      queryParams: motCle ? { q: motCle } : {}
    });
  }

  // Redirige vers l'interface de chat de l'assistant IA
  goToAssistant(): void {
    this.router.navigate(['/locataire/assistant']);
  }

  // Retourne les classes Tailwind du badge selon le score de confiance
  // (règle métier exacte du cahier des charges, section 9.2)
  getBadgeClasses(score: number): string {
    if (score >= 70) return 'bg-green-100 text-green-700';   // Fiable
    if (score >= 40) return 'bg-orange-100 text-orange-700'; // À vérifier
    return 'bg-red-100 text-red-700';                        // Risque élevé
  }

  // Retourne le texte du badge selon le score
  getBadgeLabel(score: number): string {
    if (score >= 70) return 'Fiable';
    if (score >= 40) return 'À vérifier';
    return 'Risque élevé';
  }
}