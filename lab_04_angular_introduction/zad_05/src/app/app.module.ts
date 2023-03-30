import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SelectorComponent } from './selector/selector.component';
import { BrandComponent } from './selector/brand/brand.component';
import { ColorsComponent } from './selector/colors/colors.component';
import { ModelComponent } from './selector/model/model.component';
import { OutputComponent } from './output/output.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    SelectorComponent,
    BrandComponent,
    ColorsComponent,
    ModelComponent,
    OutputComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { 
  constructor(){

  }
}
