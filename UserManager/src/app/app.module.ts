import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import * as Hammer from 'hammerjs';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './components/user/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HttpConfigInterceptor } from './auth/httpconfig.interceptor';
import { RouterModule } from '@angular/router';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './shared/in_memory_service/in-memory-data.service';
import { TicketService } from './shared/ticket_service/ticket.service';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './shared/loader.service';
import { MessagesComponent } from './components/dialogs/messages/messages.component';
import { DeleteConfirmationComponent } from './components/dialogs/delete-confirmation/delete-confirmation.component';
import { EditeComponent } from './components/dialogs/edite/edite.component';
import { InternalServerComponent } from './components/dialogs/error-page/internal-server/internal-server.component';
import { CreateComponent } from './components/dialogs/create/create.component';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    // override hammerjs default configuration
    'swipe': { direction: Hammer.DIRECTION_ALL }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    LoaderComponent,
    MessagesComponent,
    DeleteConfirmationComponent,
    EditeComponent,
    InternalServerComponent,
    CreateComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,

    ToastrModule.forRoot({
      progressBar: true
    }),
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    UserService,
    TicketService,
    LoaderService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DeleteConfirmationComponent,
    EditeComponent,
    CreateComponent
  ]
})
export class AppModule { }
