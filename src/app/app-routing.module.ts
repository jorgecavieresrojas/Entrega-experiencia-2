import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'comienzo',
    pathMatch: 'full'
  },
  {
    path: 'comienzo',
    loadChildren: () => import('./comienzo/comienzo.module').then(m => m.ComienzoPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]  // Si tienes AuthGuard, asegúrate de que está bien configurado
  },
  {
    path: 'tab4',  // Ruta para el tab4 que maneja los eventos registrados
    loadChildren: () => import('./tab4/tab4.module').then(m => m.Tab4PageModule),
    canActivate: [AuthGuard]  // Protegido por AuthGuard
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
