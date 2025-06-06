import { Component, OnInit } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { AosService } from './hero.service';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  constructor(private aosService: AosService, private router: Router, private viewportScroller: ViewportScroller) {}

  title = 'elementalstudios';
  ngOnInit(): void {
    this.aosService.init();

    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]); // Desplazar al inicio
      }
    });
  }
  

  navigateToSection(section: string): void {
    if (this.router.url === '/') {
      this.scrollToDataSection(section); // Si ya estás en la página de inicio
    } else {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollToDataSection(section), 300); // Espera y luego realiza el scroll
      });
    }
  }
 
  private scrollToDataSection(section: string): void {
    const element = document.querySelector(`[data-section="${section}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`No se encontró la sección con data-section="${section}"`);
    }
  }
}
