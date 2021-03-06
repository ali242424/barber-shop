import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { AppNgZorroAntdModule } from '../app-ng-zorro-antd.module';

const routes: Routes = [{
  path: '',
  component: HomePageComponent
}];

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule,
    AppNgZorroAntdModule
  ]
})
export class HomePageModule { }
