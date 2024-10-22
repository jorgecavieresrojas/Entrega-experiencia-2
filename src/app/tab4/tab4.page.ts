import { Component, OnInit } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { AuthService } from '../services/auth.service';
import { QRCodeService } from '../services/qrcode.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  eventosRegistrados: any[] = [];
  qrCodeUrls: { [eventoId: number]: string } = {};

  constructor(
    private eventoService: EventoService,
    private authService: AuthService,
    private qrCodeService: QRCodeService
  ) {}

  ngOnInit() {
    // Para asegurar que los eventos se carguen cuando entras por primera vez
    this.loadEventosRegistrados();
  }

  // Este método se llama cada vez que entras al tab4 para asegurarse de que los datos se recarguen
  ionViewWillEnter() {
    this.loadEventosRegistrados();
  }

  loadEventosRegistrados() {
    const currentUser = this.authService.getUserProfile();
    if (currentUser && currentUser.id) {
      this.eventoService.getEventosRegistrados(currentUser.id).subscribe((eventos: any[]) => {
        this.eventosRegistrados = eventos;

        // Genera un QR por cada evento registrado
        eventos.forEach(evento => {
          const qrData = `${evento.nombre} - ${evento.fecha} - ${currentUser.email}`;
          this.qrCodeService.generarQRCode(qrData).subscribe(qrUrl => {
            this.qrCodeUrls[evento.id] = qrUrl;
          });
        });
      });
    } else {
      alert('No se pudo obtener el perfil del usuario.');
    }
  }

  eliminarEvento(evento: any) {
    if (confirm('¿Estás seguro de que deseas eliminar tu registro de este evento?')) {
      this.eventoService.eliminarEventoRegistrado(evento.id).subscribe(() => {
        this.loadEventosRegistrados();
      });
    }
  }
}
