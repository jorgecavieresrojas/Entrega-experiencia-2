import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-comienzo',
  templateUrl: './comienzo.page.html',
  styleUrls: ['./comienzo.page.scss'],
})
export class ComienzoPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    // Crear el formulario reactivo
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  // Método para manejar el inicio de sesión
  async onLogin() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      // Llamar al servicio de autenticación para hacer la solicitud
      this.authService.login(credentials).subscribe(async (success) => {
        if (success) {
          const alert = await this.alertCtrl.create({
            header: 'Bienvenido',
            message: 'Inicio de sesión exitoso.',
            buttons: ['OK'],
          });
          await alert.present();
          this.router.navigate(['/tabs']);
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Credenciales incorrectas.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      });
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor, completa todos los campos correctamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  // Método para redirigir a la página de recuperación de contraseña
  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  // Método para redirigir a la página de registro
  register() {
    this.router.navigate(['/register']);
  }
}
