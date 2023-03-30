import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OutputAreaComponent } from './output-area/output-area.component';
import { ChoiceAreaComponent } from './choice-area/choice-area.component';
import { ChoiceItemComponent } from './choice-area/choice-item/choice-item.component';

@NgModule({
  declarations: [
    AppComponent,
    OutputAreaComponent,
    ChoiceAreaComponent,
    ChoiceItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
