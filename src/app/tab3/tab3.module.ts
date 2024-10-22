import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importamos ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { Tab3Page } from './tab3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Asegúrate de agregar esto para formularios reactivos
    IonicModule,
    Tab3PageRoutingModule
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
