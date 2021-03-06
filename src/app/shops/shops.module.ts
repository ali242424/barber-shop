import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';
import { SharedModule } from '../shared/shared.module';
import { BookingServiceComponent } from './booking-service/booking-service.component';
import { AppNgZorroAntdModule } from '../app-ng-zorro-antd.module';


@NgModule({
  declarations: [
    ShopsComponent,
    BookingServiceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopsRoutingModule,
    AppNgZorroAntdModule
  ]
})
export class ShopsModule { }
