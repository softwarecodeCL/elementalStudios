import { Component, OnInit  } from '@angular/core';
import { ContactComponent } from '../contact/contact.component'
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContactComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  structuredData: string = '';

  constructor(private titleService: Title, private metaService: Meta, private router: Router) {}

  ngOnInit(): void {
    // Configurar el título y las etiquetas meta
  // Establecer el título de la página
  const pageTitle = '👨‍🏫 Aprende Inglés Online | Clases Personalizadas - Elemental Studios';
  this.titleService.setTitle(pageTitle);

  // Actualizar meta tags estándar
  this.metaService.updateTag({
    name: 'description',
    content: 'Clases de inglés online personalizadas. Aprende con profesores expertos y mejora tu fluidez y confianza en el idioma.'
  });
  this.metaService.updateTag({
    name: 'keywords',
    content: 'clases de inglés online particulares, aprender inglés rápido, cursos personalizados de inglés, inglés para principiantes, inglés para negocios, mejorar fluidez en inglés, preparación para exámenes de inglés, inglés conversacional, lecciones de inglés virtuales, profesores de inglés online, Elemental Studios, inglés para negocios, cursos de inglés para empresas, inglés para entrevistas de trabajo, inglés profesional online, mejorar inglés para trabajo'
  });

  // Agregar meta tags de Open Graph
  this.metaService.addTag({
    property: 'og:title',
    content: pageTitle
  });
  this.metaService.addTag({
    property: 'og:description',
    content: 'Clases de inglés online personalizadas. Aprende con profesores expertos y mejora tu fluidez rápidamente.'
  });
  this.metaService.addTag({
    property: 'og:image',
    content: 'https://elementalstudios.cl/assets/brand/logofull.png'
  });
  this.metaService.addTag({
    property: 'og:url',
    content: 'https://elementalstudios.cl/'
  });

  // Agregar meta tags de Twitter
  this.metaService.addTag({
    property: 'twitter:card',
    content: 'summary_large_image'
  });
  this.metaService.addTag({
    property: 'twitter:title',
    content: pageTitle
  });
  this.metaService.addTag({
    property: 'twitter:description',
    content: 'Clases de inglés online personalizadas. Aprende con profesores expertos y mejora tu fluidez rápidamente.'
  });
  this.metaService.addTag({
    property: 'twitter:image',
    content: 'https://elementalstudios.cl/assets/brand/logofull.png'
  });

    // Generar datos estructurados como una cadena JSON
    this.structuredData = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Elemental Studios",
      "description": "Clases personalizadas de inglés online para mejorar tu fluidez y confianza en el idioma.",
      "url": "https://elementalstudios.cl/",
      "logo": "https://elementalstudios.cl/assets/brand/logofull.png",
      "sameAs": [
        "https://www.facebook.com/ElementalStudiosSpA",
        "https://www.linkedin.com/company/elemental-studios-cap"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Los Pajaritos 3030",
        "addressLocality": "Maipú",
        "addressRegion": "RM",
        "postalCode": "9250000",
        "addressCountry": "CL"
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
