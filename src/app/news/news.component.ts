import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  structuredData: string = '';

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('🌟 La Importancia de Saber Inglés | Noticias - Elemental Studios');
    this.metaService.addTags([
      { name: 'description', content: 'Explora por qué aprender inglés es fundamental en el mundo actual. Descubre consejos, oportunidades y más.' },
      { name: 'keywords', content: 'cursos de inglés online, clases particulares de inglés, inglés para empresas, inglés corporativo, preparación para entrevistas en inglés, inglés para negocios, aprender inglés para el trabajo, cursos intensivos de inglés, inglés para ejecutivos, mejorar inglés hablado, clases de inglés personalizadas, lecciones de inglés virtuales, cursos de inglés a medida, inglés profesional, clases de inglés para empresas, trabajos como intérprete, intérprete de inglés, cursos de interpretación, habilidades de traducción, inglés para intérpretes, capacitación para intérpretes, servicios de interpretación en inglés' },
      { property: 'og:title', content: '🌟 La Importancia de Saber Inglés | Noticias - Elemental Studios' },
      { property: 'og:description', content: 'Explora por qué aprender inglés es fundamental en el mundo actual. Descubre consejos, oportunidades y más.' },
      { property: 'og:image', content: 'https://elementalstudios.cl/assets/news/1.webp' },
      { property: 'og:url', content: 'https://elementalstudios.cl/noticias/la-importancia-de-saber-ingles' }
    ]);

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
