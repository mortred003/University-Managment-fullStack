import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home.component';
import { DepartmentsComponent } from './pages/departments.component';
import { AboutComponent } from './pages/about.component';
import {AdminDepartmentsComponent} from './pages/admin-departments.component';

export const routes: Routes = [
  { path: '',           component: HomeComponent,       data:{ anim:'Home' }  },
  { path: 'about',      component: AboutComponent,      data:{ anim:'About' } },
  { path: 'departments',component: DepartmentsComponent, data:{ anim:'Dept' }  },
  { path: 'admin/departments', component: AdminDepartmentsComponent },
  { path: '**', redirectTo: '' }
];
