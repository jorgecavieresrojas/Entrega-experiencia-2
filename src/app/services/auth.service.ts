import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuController } from '@ionic/angular';  // Importamos el controlador del menú

interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  rut: string;  // Añadimos el campo 'rut'
  image: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';  // URL de la API simulada para json-server
  private isAuthenticated = false;
  private currentUser: User | null = null;

  constructor(private http: HttpClient, private menuCtrl: MenuController) {}  // Inyectamos el MenuController

  // Método para iniciar sesión
  login(credentials: { email: string; password: string }): Observable<boolean> {
    return this.http.get<User[]>(this.apiUrl, {
      params: {
        email: credentials.email,
        password: credentials.password
      }
    }).pipe(
      map(users => {
        if (users.length > 0) {
          this.isAuthenticated = true;
          this.currentUser = users[0];
          return true;
        } else {
          this.isAuthenticated = false;
          return false;
        }
      })
    );
  }

  // Método para registrar un nuevo usuario, con el campo 'rut'
  register(user: { name: string; email: string; password: string; rut: string; image: string | null }): Observable<boolean> {
    return this.http.post<User>(this.apiUrl, user).pipe(
      map(() => true)
    );
  }

  // Método para actualizar el perfil del usuario
  updateUserProfile(updatedUser: { name: string; email: string; rut: string; image: string | null }): Observable<boolean> {
    if (this.currentUser) {
      // Mantenemos todas las propiedades del usuario actual, incluyendo el password
      const updatedProfile = {
        ...this.currentUser,
        name: updatedUser.name,
        email: updatedUser.email,
        rut: updatedUser.rut,  // Aseguramos que el RUT también se actualice
        image: updatedUser.image
      };
  
      return this.http.patch<User>(`${this.apiUrl}/${this.currentUser.id}`, updatedProfile).pipe(
        map(() => {
          // Actualizamos el usuario localmente después de actualizar en el servidor
          this.currentUser = updatedProfile;
          return true;
        })
      );
    }
    return of(false);  // Si no hay un usuario autenticado, retornamos false
  }

  // Obtener la información del perfil del usuario actual
  getUserProfile(): User | null {
    return this.currentUser;
  }

  // Método para verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Método para cerrar sesión y cerrar el menú desplegable
  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.menuCtrl.close();  // Cerramos el menú al cerrar sesión
  }
}
