import { Component, OnInit } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { AuthService } from '../services/auth.service';
import { QRCodeService } from '../services/qrcode.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  eventos: any[] = [];
  qrCodeUrl: string | undefined;

  constructor(
    private eventoService: EventoService,
    private authService: AuthService,
    private qrCodeService: QRCodeService
  ) {}

  ngOnInit() {
    this.obtenerEventos();
  }

  obtenerEventos() {
    this.eventoService.getEventos().subscribe((eventos: any[]) => {
      this.eventos = eventos;
    });
  }

  onRegisterEvento(evento: any) {
    const currentUser = this.authService.getUserProfile();

    if (currentUser && currentUser.rut) {
      const eventoRegistrado = {
        userId: currentUser.id,
        nombre: evento.nombre,
        fecha: evento.fecha,
        lugar: evento.lugar,
        descripcion: evento.descripcion
      };

      // Guardar el evento registrado en el servidor
      this.eventoService.registrarEvento(eventoRegistrado).subscribe(() => {
        const qrData = `${evento.nombre} - ${evento.fecha} - ${currentUser.email}`;
        this.qrCodeService.generarQRCode(qrData).subscribe(qrCodeUrl => {
          this.qrCodeUrl = qrCodeUrl;
          alert('Te has registrado al evento y el QR ha sido generado.');
        });
      });
    } else {
      alert('No se pudo obtener el perfil del usuario o el RUT está faltando.');
    }
  }
}
