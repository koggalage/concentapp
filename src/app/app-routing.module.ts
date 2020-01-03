import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  //{ path: 'customer-registration', loadChildren: './customer/customer-registration/customer-registration.module#CustomerRegistrationPageModule' },
  // { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  //{ path: '', loadChildren: './auth/login/login.module#LoginPageModule' },
  // { path: 'customer-search', loadChildren: './customer/customer-search/customer-search.module#CustomerSearchPageModule' },
  // { path: 'daily-concent', loadChildren: './concent/daily-concent/daily-concent.module#DailyConcentPageModule' },
  { path: '', loadChildren: './menu/menu.module#MenuPageModule' },
  //{ path: 'customer-info', loadChildren: './customer/customer-info/customer-info.module#CustomerInfoPageModule' },
  // { path: 'init-concent', loadChildren: './concent/init-concent/init-concent.module#InitConcentPageModule' },
  // { path: 'app-header', loadChildren: './shared/app-header/app-header.module#AppHeaderPageModule' },
  // { path: 'daily-update', loadChildren: './treatment/daily-update/daily-update.module#DailyUpdatePageModule' },
  // { path: 'treatment-history', loadChildren: './treatment/treatment-history/treatment-history.module#TreatmentHistoryPageModule' }

  //already commented
  //{ path: 'concent', loadChildren: './concent/concent.module#ConcentPageModule' },
  // { path: 'signature', loadChildren: './signature/signature.module#SignaturePageModule' },
  // { path: 'agreement', loadChildren: './shared/agreement/agreement.module#AgreementPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
