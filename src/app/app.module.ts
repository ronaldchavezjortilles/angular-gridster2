import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modulos
import { AppRoutingModule } from './app-routing.module';
import { GridsterModule } from 'angular-gridster2';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown';


import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NosotrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridsterModule,
    BrowserAnimationsModule,
    MatIconModule,
    MarkdownModule.forRoot(),  // Asegúrate de agregar MarkdownModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
