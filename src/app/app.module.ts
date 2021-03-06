import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './shared/components/main/main.component';
import { IconsProviderModule } from './icons-provider.module';
import { AppNgZorroAntdModule } from './app-ng-zorro-antd.module';
import { TokenInterceptor } from './shared/services/token.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    AppNgZorroAntdModule],

  providers: [{ provide: NZ_I18N, useValue: en_US },
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
