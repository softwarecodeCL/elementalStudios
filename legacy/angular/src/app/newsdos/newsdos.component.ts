import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './newsdos.component.html',
  styleUrl: './newsdos.component.css'
})
export class NewsdosComponent implements OnInit {
  structuredData: string = '';

  constructor(private titleService: Title, private metaService: Meta, private router: Router) {}

  ngOnInit(): void {
    // Configuración del título y metadatos para SEO
    this.titleService.setTitle('📘 Clases de Inglés Online Personalizadas - Aprende Rápido y Mejora tu Fluidez con Expertos');

    // Actualizar meta tags estándar
    this.metaService.updateTag({
      name: 'description',
      content: 'Conoce cómo aprender inglés puede transformar tu vida. Descubre métodos efectivos, recursos innovadores y beneficios prácticos del inglés para el mundo profesional y personal.'
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'clases particulares de inglés en Santiago, curso intensivo de inglés online, aprender inglés fácil, curso de inglés básico para principiantes, inglés avanzado, mejorar inglés, técnicas de aprendizaje de inglés, inglés para viajar, idiomas para negocios, educación en inglés, Clases de inglés en Chile, Profesor de inglés en Santiago, Cursos de inglés online en Chile, inglés para entrevistas de trabajo, inglés conversacional, clases de inglés personalizadas'
    });
    
    // Agregar meta tags de Open Graph
    this.metaService.addTag({
      property: 'og:title',
      content: 'Aprende Inglés y Expande Tus Oportunidades | noticias - ElementalStudios.cl'
    });
    this.metaService.addTag({
      property: 'og:description',
      content: 'Conoce cómo aprender inglés puede transformar tu vida. Descubre métodos efectivos, recursos innovadores y beneficios prácticos del inglés para el mundo profesional y personal.'
    });
    this.metaService.addTag({
      property: 'og:image',
      content: 'https://elementalstudios.cl/assets/news/ingles-oportunidades.jpg'
    });
    this.metaService.addTag({
      property: 'og:url',
      content: 'https://elementalstudios.cl/noticias/dominar-el-ingles-facilmente'
    });
    
    // Agregar meta tags de Twitter
    this.metaService.addTag({
      property: 'twitter:card',
      content: 'summary_large_image'
    });
    this.metaService.addTag({
      property: 'twitter:title',
      content: '📘 Aprende Inglés y Expande Tus Oportunidades | noticias - ElementalStudios'
    });
    this.metaService.addTag({
      property: 'twitter:description',
      content: 'Conoce cómo aprender inglés puede transformar tu vida. Descubre métodos efectivos, recursos innovadores y beneficios prácticos del inglés para el mundo profesional y personal.'
    });
    this.metaService.addTag({
      property: 'twitter:image',
      content: 'https://elementalstudios.cl/assets/news/ingles-oportunidades.jpg'
    });
    
    // Configuración de datos estructurados JSON-LD
    this.structuredData = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Aprende Inglés y Expande Tus Oportunidades",
      "description": "Descubre clases de inglés online adaptadas a tus necesidades. Mejora tu fluidez, confianza y domina el inglés con profesores expertos..",
      "image": "https://elementalstudios.cl/assets/news/ingles-oportunidades.jpg",
      "author": {
        "@type": "Person",
        "name": "ElementalStudios"
      },
      "publisher": {
        "@type": "Organization",
        "name": "ElementalStudios",
        "logo": {
          "@type": "ImageObject",
          "url": "https://elementalstudios.cl/assets/brand/logo.png"
        }
      },
      "datePublished": "2024-12-11",
      "dateModified": "2024-12-11",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://elementalstudios.cl/noticias/dominar-el-ingles-facilmente"
      }
    });
  }
  
    
  
  navigateToSection(section: string): void {
    if (this.router.url === '/noticias/dominar-el-ingles-facilmente') {
      this.scrollToDataSection(section); // Si ya estás en la página de inicio
    } else {
      this.router.navigate(['/noticias/dominar-el-ingles-facilmente']).then(() => {
        setTimeout(() => this.scrollToDataSection(section), 300); // Espera y luego realiza el scroll
      });
    }
  }
 
  private scrollToDataSection(section: string): void {
    const element = document.querySelector(`[id="${section}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`No se encontró la sección con id="${section}"`);
    }
  }
}
