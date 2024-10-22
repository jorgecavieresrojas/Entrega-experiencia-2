import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private apiUrl = 'http://localhost:3000'; // Asegúrate de que tu json-server esté apuntando a esta dirección

  constructor(private http: HttpClient) {}

  getEventos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/eventos`);
  }

  getEventosRegistrados(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/eventosRegistrados?userId=${userId}`);
  }

  registrarEvento(evento: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/eventosRegistrados`, evento);
  }

  eliminarEventoRegistrado(eventoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eventosRegistrados/${eventoId}`);
  }
}
