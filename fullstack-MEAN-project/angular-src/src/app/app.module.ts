import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FlashMessagesModule } from 'flash-messages-angular';
import { JwtModule } from "@auth0/angular-jwt";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthGuard } from './guards/auth.guard';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { RatingComponent } from './components/rating/rating.component';
import { DeleteBookComponent } from './components/delete-book/delete-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { GenreDetailComponent } from './components/genre-detail/genre-detail.component';
import { ScrollButtonComponent } from './components/scroll-button/scroll-button.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookChartsComponent } from './components/book-charts/book-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    FooterComponent,
    BookDetailComponent,
    RatingComponent,
    DeleteBookComponent,
    EditBookComponent,
    DeleteUserComponent,
    BookSearchComponent,
    GenreDetailComponent,
    ScrollButtonComponent,
    AddBookComponent,
    BookChartsComponent,
  ],
  imports: [
    JwtModule.forRoot({
       config: { 
         tokenGetter: () => {
          return localStorage.getItem("id_token");
        },
        allowedDomains: ["localhost:3000"]
       }
    }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
