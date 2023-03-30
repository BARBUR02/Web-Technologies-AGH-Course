import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PhotosComponent } from './photos/photos.component';
import { PostsComponent } from './posts/posts.component';
import { ApicallService } from './services/apicall.service';
import { PhotoItemComponent } from './photos/photo-item/photo-item.component';
import { PostComponent } from './posts/post/post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SingePhotoViewComponent } from './singe-photo-view/singe-photo-view.component';

const appRoutes: Routes= [
  {path:'home', component: HomePageComponent},
  {path:'posts', component: PostsComponent},
  {path:'photos', component: PhotosComponent},
  {path:'photos/:albumId/:id', component: SingePhotoViewComponent},
  {path:'', redirectTo: '/home', pathMatch:'full'},

]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PhotosComponent,
    PostsComponent,
    PhotoItemComponent,
    PostComponent,
    SingePhotoViewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ApicallService],
  bootstrap: [AppComponent]
})
export class AppModule { }
