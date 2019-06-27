import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueueComponent } from './queue/queue.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  {
    path: '',
    component: QueueComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  /*{
    path: 'gallery/:type',
    component: ImageGalleryComponent
  },*/
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
