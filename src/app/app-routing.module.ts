import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataComponent } from './user-data/user-data.component';

const routes : Routes = [
  { path: '', redirectTo: '/userManagement', pathMatch: 'full' },
  { path: 'userManagement', component: UserDataComponent },
  { path: '**', redirectTo: '/userManagement' }
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
