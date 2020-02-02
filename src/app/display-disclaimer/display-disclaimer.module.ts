import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DisplayDisclaimerPage } from './display-disclaimer.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayDisclaimerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DisplayDisclaimerPage]
})
export class DisplayDisclaimerPageModule {}
