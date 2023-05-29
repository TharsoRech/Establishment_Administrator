import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './Pages/DashBoard/DashBoard.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { HomeComponent } from './Pages/Home/home.component'
import { AuthGuard } from './Shared/Guards/AuthGuard';

const routes: Routes = [
  { path: 'DashBoard', component: DashBoardComponent ,canActivate: [AuthGuard]},
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
