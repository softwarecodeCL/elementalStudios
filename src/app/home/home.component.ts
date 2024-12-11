import { Component, OnInit  } from '@angular/core';
import { ContactComponent } from '../contact/contact.component'
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  structuredData: string = '';

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    // Configurar el título y las etiquetas meta
    this.titleService.setTitle('👨‍🏫 Aprende Inglés Online | Clases Personalizadas - Elemental Studios');
    this.metaService.addTags([
      { name: 'description', content: 'Clases de inglés online personalizadas. Aprende con profesores expertos y mejora tu fluidez rápidamente.' },
      { name: 'keywords', content: 'clases de inglés online particulares, aprender inglés rápido, cursos personalizados de inglés, inglés para principiantes, inglés para negocios, mejorar fluidez en inglés, preparación para exámenes de inglés, inglés conversacional, lecciones de inglés virtuales, profesores de inglés online, Elemental Studios, inglés para negocios, cursos de inglés para empresas, inglés para entrevistas de trabajo, inglés profesional online, mejorar inglés para trabajo' },
      { property: 'og:title', content: '🌟 Aprende Inglés Online | Clases Personalizadas - Elemental Studios' },
      { property: 'og:description', content: 'Clases de inglés online personalizadas. Aprende con profesores expertos y mejora tu fluidez rápidamente.' },
      { property: 'og:image', content: 'https://elementalstudios.cl/assets/brand/logofull.png' },
      { property: 'og:url', content: 'https://elementalstudios.cl/' }
    ]);

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
}
