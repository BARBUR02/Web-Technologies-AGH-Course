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
import { HomePageComponent } from './home-page/home-page.component';
import { ShoppingHistoryComponent } from './shopping-history/shopping-history.component';
import { RecordComponent } from './shopping-history/record/record.component';
import { FilterPipePipe } from './shopping-history/filter-pipe.pipe';
import { SingleTripViewComponent } from './single-trip-view/single-trip-view.component';
import { StatsComponent } from './single-trip-view/stats/stats.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';

const appRoutes: Routes =[
  {path: '', component: HomePageComponent},
  {path: 'trips-for-you', component: TripSectionComponent},
  {path: 'trip-add-form', component: TripAddFormComponent},
  {path: 'shopping-card', component: ShoppingCardComponent},
  {path: 'shopping-history', component: ShoppingHistoryComponent},
  {path: 'trips-for-you/:tripName/:tripDestination', component: SingleTripViewComponent}
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
    HomePageComponent,
    ShoppingHistoryComponent,
    RecordComponent,
    FilterPipePipe,
    SingleTripViewComponent,
    StatsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule,
    NgxSliderModule,
    FormsModule,
    NgSelectModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
  ],
  
  providers: [tripDataService,TripCountService,tripFilterService],
  bootstrap: [AppComponent],
})
export class AppModule { }
