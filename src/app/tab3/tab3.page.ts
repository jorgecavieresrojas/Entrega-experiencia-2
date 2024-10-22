import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  perfilForm: FormGroup;
  imagePreview: string | null = null;  // Para mostrar la vista previa de la imagen seleccionada

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.perfilForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      image: [null]  // Campo para la imagen
    });

    const userProfile = this.authService.getUserProfile();
    if (userProfile) {
      this.perfilForm.patchValue(userProfile);
      this.imagePreview = userProfile.image || null;  // Cargar la imagen actual si existe
    }
  }

  ngOnInit() {}

  // Método para manejar la selección de la imagen
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.perfilForm.patchValue({ image: file });
        this.perfilForm.get('image')?.updateValueAndValidity();
      };
      reader.readAsDataURL(file);  // Lee el archivo y genera una URL para vista previa
    }
  }

  // Método para manejar la actualización del perfil
  onUpdateProfile() {
    if (this.perfilForm.valid) {
      const updatedUser = this.perfilForm.value;
      this.authService.updateUserProfile(updatedUser).subscribe(success => {
        if (success) {
          this.router.navigate(['/tabs/tab3']);
        }
      });
    }
  }
}
