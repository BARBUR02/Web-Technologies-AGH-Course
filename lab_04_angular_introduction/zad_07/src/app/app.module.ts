import {  NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FilterSidebarComponent } from './filter-sidebar/filter-sidebar.component';
import { HeaderComponent } from './header/header.component';
import { TripSectionComponent } from './trip-section/trip-section.component';
import { TripItemComponent } from './trip-section/trip-item/trip-item.component';
import { tripDataService } from './tripdataservice';
import { FilterAreaComponent } from './filter-sidebar/filter-area/filter-area.component';
import { BookedTripInfoComponent } from './filter-sidebar/booked-trip-info/booked-trip-info.component';
import { TripCountService } from './tripcountservice';
import { BookedTripAmountComponent } from './filter-sidebar/booked-trip-amount/booked-trip-amount.component';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { TripAddFormComponent } from './trip-add-form/trip-add-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCardItemComponent } from './shopping-card/shopping-card-item/shopping-card-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StarComponent } from './trip-section/trip-item/star/star.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgSelectModule } from "@ng-select/ng-select";
import { CountryPipePipe } from './country-pipe.pipe';
import { PricePipePipe } from './price-pipe.pipe';
import { DatePipePipe } from './date-pipe.pipe';
import { StarPipePipe } from './star-pipe.pipe';
import { tripFilterService } from './tripfilterservice';

const appRoutes: Routes =[
  {path: '', component: TripSectionComponent},
  {path: 'trip-add-form', component: TripAddFormComponent},
  {path: 'shopping-card', component: ShoppingCardComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    FilterSidebarComponent,
    HeaderComponent,
    TripSectionComponent,
    TripItemComponent,
    FilterAreaComponent,
    BookedTripInfoComponent,
    BookedTripAmountComponent,
    TripAddFormComponent,
    ShoppingCardComponent,
    ShoppingCardItemComponent,
    StarComponent,
    CountryPipePipe,
    PricePipePipe,
    DatePipePipe,
    StarPipePipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
    NgxSliderModule,
    FormsModule,
    NgSelectModule
  ],
  
  providers: [tripDataService,TripCountService,tripFilterService],
  bootstrap: [AppComponent],
})
export class AppModule { }
