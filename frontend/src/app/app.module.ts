import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LandingPageComponent } from './pages/landing/landing.page';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { APIClient } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FoodCardComponent } from './components/food-card/food-card.component';
import { FoodSelectorComponent } from './components/food-selector/food-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    FoodCardComponent,
    FoodSelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    NgbModule
  ],
  providers: [APIClient],
  bootstrap: [AppComponent]
})
export class AppModule {}
