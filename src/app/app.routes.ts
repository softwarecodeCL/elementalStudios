import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Ruta raíz
  { path: 'noticias/la-importancia-de-saber-ingles', component: NewsComponent }, // Ruta /noticias
  { path: '**', redirectTo: '' }  // Ruta para páginas no encontradas
];
