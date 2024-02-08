import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ErrorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  //providers: [provideHttpClient(withInterceptors([ErrorHandlerInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
function provideHttpClient(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
  throw new Error('Function not implemented.');
}

