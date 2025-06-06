import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { NewsdosComponent } from './newsdos/newsdos.component';
import { NoticiasComponent } from './noticias/noticias.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },  // Ruta raíz
  { path: 'noticias/la-importancia-de-saber-ingles', component: NewsComponent }, // Ruta /noticias
  { path: 'noticias/dominar-el-ingles-facilmente', component: NewsdosComponent }, 
 // { path: 'noticias', component: NoticiasComponent }, 
  { path: '**', redirectTo: '' }  // Ruta para páginas no encontradas
];
