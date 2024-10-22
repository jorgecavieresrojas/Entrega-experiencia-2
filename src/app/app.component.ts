import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';  // Asegúrate de que el servicio de autenticación esté correctamente importado

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  cerrarSesion() {
    this.authService.logout();  // Cerrar sesión con el AuthService
    this.router.navigate(['/comienzo']);  // Redirigir al inicio o página de login
  }
}
