import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-news',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  structuredData: string = '';

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('🌟 La Importancia de Aprender Inglés en el Mundo Actual | Elemental Studios');

    // Actualizar meta tags estándar
    this.metaService.updateTag({
      name: 'description',
      content: 'Aprender inglés es esencial para el éxito profesional y personal. Descubre cómo las clases de inglés online pueden ayudarte a mejorar tu fluidez y abrir nuevas oportunidades en el mundo globalizado.'
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'aprender inglés, clases de inglés online, cursos personalizados de inglés, inglés para negocios, inglés profesional, mejorar fluidez en inglés, preparación para entrevistas en inglés, intérprete de inglés, habilidades de traducción, inglés conversacional, inglés para ejecutivos, lecciones de inglés virtuales'
    });
  
    // Agregar meta tags de Open Graph
    this.metaService.addTag({
      property: 'og:title',
      content: '🌟 La Importancia de Aprender Inglés en el Mundo Actual | Elemental Studios'
    });
    this.metaService.addTag({
      property: 'og:description',
      content: 'Descubre por qué aprender inglés es clave para el éxito profesional y personal. Mejora tu fluidez con clases online personalizadas y abre nuevas oportunidades.'
    });
    this.metaService.addTag({
      property: 'og:image',
      content: 'https://elementalstudios.cl/assets/news/1.webp'
    });
    this.metaService.addTag({
      property: 'og:url',
      content: 'https://elementalstudios.cl/noticias/la-importancia-de-saber-ingles'
    });

    this.structuredData = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "La Importancia de Saber Inglés",
      "description": "Explora por qué aprender inglés es fundamental en el mundo actual. Descubre consejos, oportunidades y más.",
      "image": "https://elementalstudios.cl/assets/news/1.webp",
      "author": {
        "@type": "Organization",
        "name": "Elemental Studios"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Elemental Studios",
        "logo": {
          "@type": "ImageObject",
          "url": "https://elementalstudios.cl/assets/brand/logofull.png"
        }
      },
      "datePublished": "2024-12-11",
      "dateModified": "2024-12-11"
    });
  }
}
