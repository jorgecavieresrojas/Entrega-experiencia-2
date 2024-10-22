import { Component, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import Swiper from 'swiper';  // Importa Swiper desde el paquete principal

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit {

  swiper?: Swiper;

  ngAfterViewInit() {
    this.swiper = new Swiper('.swiper-container', {
      autoplay: {
        delay: 2500,  // Cambia las imágenes automáticamente cada 2.5 segundos
        disableOnInteraction: false,  // No detener el autoplay cuando se interactúe
      },
      loop: true,  // Repetir las imágenes en bucle
      slidesPerView: 1,  // Mostrar solo una imagen a la vez
      spaceBetween: 10,  // Espacio entre las imágenes
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });
  }


  constructor(private menu: MenuController) {}

  mostrarMenu() {
    this.menu.open();
  }
}
