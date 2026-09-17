import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Welcome (landing) page for FINDOOR AI.
 *
 * Standalone component: no NgModule needed, so it declares its own
 * dependencies (here, just RouterLink for the /login and /register CTAs).
 * The page itself is presentational — there is no backend call, no auth
 * logic, and no dynamic listing data yet. That intentionally matches the
 * current project scope (landing page only, everything else comes later).
 */
@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {
  /** Used in the footer copyright line so it never goes stale. */
  protected readonly currentYear = new Date().getFullYear();
}
