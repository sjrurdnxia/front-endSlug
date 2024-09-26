import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { CarFormComponent } from './car-form/car-form.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/cars', pathMatch: 'full' }, // Redirects root to /cars
  { path: 'cars', component: CarListComponent }, // Shows CarListComponent at /cars
  { path: 'cars/new', component: CarFormComponent }, // Shows CarFormComponent at /cars/new
  { path: 'cars/:id', component: CarDetailComponent }, // Shows CarDetailComponent at /cars/:id
  { path: 'cars/:id/edit', component: CarFormComponent }, // Shows CarFormComponent at /cars/:id/edit
  { path: 'login', component: LoginComponent }, // Shows LoginComponent at /login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export { routes };
