import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormRoutingModule } from './reactive-form-routing.module';
import { FormContainerComponent } from './container/form-container/form-container.component';
import { BasicFormComponent } from './components/basic-form/basic-form.component';
import { NebularModule } from '../nebular/nebular.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OptionsFormComponent } from './components/options-form/options-form.component';
import { PhonesFormComponent } from './components/phones-form/phones-form.component';

@NgModule({
  declarations: [
    FormContainerComponent,
    BasicFormComponent,
    OptionsFormComponent,
    PhonesFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormRoutingModule,
    NebularModule
  ]
})
export class ReactiveFormModule { }
