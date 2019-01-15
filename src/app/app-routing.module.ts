import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'signupform', loadChildren: './signupform/signupform.module#SignupformPageModule' },
  { path: 'goals', loadChildren: './goals/goals.module#GoalsPageModule' },
  { path: 'medicalhistory', loadChildren: './medicalhistory/medicalhistory.module#MedicalhistoryPageModule' },
  { path: 'disclaimer', loadChildren: './disclaimer/disclaimer.module#DisclaimerPageModule' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'workout', loadChildren: './workout/workout.module#WorkoutPageModule' },  { path: 'thankyou', loadChildren: './thankyou/thankyou.module#ThankyouPageModule' },
  { path: 'contactus', loadChildren: './contactus/contactus.module#ContactusPageModule' },
  { path: 'workoutlog', loadChildren: './workoutlog/workoutlog.module#WorkoutlogPageModule' },
  { path: 'foodlog', loadChildren: './foodlog/foodlog.module#FoodlogPageModule' },
  { path: 'aboutus', loadChildren: './aboutus/aboutus.module#AboutusPageModule' }


  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
