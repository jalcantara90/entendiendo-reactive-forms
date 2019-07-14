import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbLayoutModule,
  NbThemeModule,
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbCheckboxModule,
  NbRadioModule,
  NbSelectModule,
  NbDatepickerModule,
  NbIconModule,
  NbProgressBarModule,
  NbSpinnerModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

const nebularModules = [
  NbLayoutModule,
  NbEvaIconsModule,
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbCheckboxModule,
  NbRadioModule,
  NbSelectModule,
  NbIconModule,
  NbSpinnerModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    nebularModules
  ],
  exports: [nebularModules, NbDatepickerModule]
})
export class NebularModule {}
