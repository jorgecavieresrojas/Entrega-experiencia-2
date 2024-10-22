import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email: string = '';

  constructor(private alertController: AlertController) {}

  
  async sendRecoveryEmail() {
    const alert = await this.alertController.create({
      header: 'Correo Enviado',
      message: `Se ha enviado un correo de recuperación a ${this.email || 'tu correo electrónico'}.`,
      buttons: ['OK']
    });

    await alert.present();
  }
}
