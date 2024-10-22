import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Importamos ReactiveFormsModule
import { IonicModule } from '@ionic/angular';

import { ComienzoPageRoutingModule } from './comienzo-routing.module';
import { ComienzoPage } from './comienzo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComienzoPageRoutingModule
  ],
  declarations: [ComienzoPage]
})
export class ComienzoPageModule {}
