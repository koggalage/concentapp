import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDataService } from '../customer-data-service';
import { IonicModule } from '@ionic/angular';

import { CustomerInfoPage } from './customer-info.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CustomerInfoPage],
  providers: [CustomerDataService]
})
export class CustomerInfoPageModule { }
