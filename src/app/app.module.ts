import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { ActivitySliderComponent } from './components/activity-slider/activity-slider.component';
import { ActivityButtonComponent } from './components/activity-button/activity-button.component';
import { ShopComponent } from './components/shop/shop.component';
import { MySidenavComponent } from './components/my-sidenav/my-sidenav.component';
import { PulsingTextComponent } from './components/pulsing-text/pulsing-text.component';
import { ActivityCardComponent } from './components/activity-card/activity-card.component';
import { ImprovementCardComponent } from './components/improvement-card/improvement-card.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { ExchangeCardComponent } from './components/exchange-card/exchange-card.component';
import { AccordionActivitiesComponent } from './components/accordion-activities/accordion-activities.component';
import { AccordionInventoryComponent } from './components/accordion-inventory/accordion-inventory.component';
import { AccordionStatsComponent } from './components/accordion-stats/accordion-stats.component';
import { PowersComponent } from './components/powers/powers.component';
import { PowersCardComponent } from './components/powers-card/powers-card.component';
import { RebirthComponent } from './components/rebirth/rebirth.component';
import { RebirthCardComponent } from './components/rebirth-card/rebirth-card.component';
import { PowersSummaryCardComponent } from './components/powers-summary-card/powers-summary-card.component';
import { CarnivalComponent } from './components/carnival/carnival.component';
import { CarnivalCardComponent } from './components/carnival-card/carnival-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    ActivitySliderComponent,
    ActivityButtonComponent,
    ShopComponent,
    MySidenavComponent,
    PulsingTextComponent,
    ActivityCardComponent,
    ImprovementCardComponent,
    ExchangeComponent,
    ExchangeCardComponent,
    AccordionActivitiesComponent,
    AccordionInventoryComponent,
    AccordionStatsComponent,
    PowersComponent,
    PowersCardComponent,
    RebirthComponent,
    RebirthCardComponent,
    PowersSummaryCardComponent,
    CarnivalComponent,
    CarnivalCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
