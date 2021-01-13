import { TimestampPipe } from './shared/pipes/timestamp.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LicenceStatusPipe } from './licence-detail/licence-status.pipe';
import { LicenceMasterComponent } from './licence-master/licence-master.component';
import { LicenceDetailComponent } from './licence-detail/licence-detail.component';
import { environment } from 'src/environments/environment';
import { LicenceState } from './model/state-model';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LicenceStatusPipe,
    LicenceMasterComponent,
    LicenceDetailComponent,
    TimestampPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    NgbModule,
    NgxsModule.forRoot([LicenceState], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
