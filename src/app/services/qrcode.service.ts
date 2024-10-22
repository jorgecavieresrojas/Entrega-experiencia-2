import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as QRCode from 'qrcode';

@Injectable({
  providedIn: 'root',
})
export class QRCodeService {

  constructor() { }

  generarQRCode(contenido: string): Observable<string> {
    return new Observable((observer) => {
      QRCode.toDataURL(contenido, { errorCorrectionLevel: 'H' })
        .then((url: string) => {
          observer.next(url);
          observer.complete();
        })
        .catch((err: Error) => {
          console.error('Error generando el QR Code', err);
          observer.error(err);
        });
    });
  }
}
