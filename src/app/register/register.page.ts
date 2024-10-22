import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      rut: ['', [Validators.required, Validators.minLength(8)]],
      image: [null],
    }, { validators: this.passwordsMatch });
  }

  ngOnInit() {}

  passwordsMatch(form: FormGroup) {
    const password = form.get('password')!.value;
    const confirmPassword = form.get('confirmPassword')!.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.registerForm.patchValue({ image: file });
        this.registerForm.get('image')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);
    }
  }

  async onRegister() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;

      this.authService.register({
        name: user.name,
        email: user.email,
        password: user.password,
        rut: user.rut,
        image: user.image || null,
      }).subscribe(async (success) => {
        if (success) {
          const alert = await this.alertCtrl.create({
            header: 'Registro Exitoso',
            message: 'Te has registrado correctamente.',
            buttons: ['OK'],
          });
          await alert.present();
          this.router.navigate(['/comienzo']);
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
}
