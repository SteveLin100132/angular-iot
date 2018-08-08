import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule  } from 'angularfire2/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { DevicesPageComponent } from './devices-page/devices-page.component';
import { AnalysisPageComponent } from './analysis-page/analysis-page.component';
import { DeviceDetailComponent } from './devices-page/device-detail/device-detail.component';
import { DevicePanelDirective } from './devices-page/device-panel.directive';

import { DevicesDataService } from './devices-data.service';

import { firebaseConfig } from './firebase.config';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    DevicesPageComponent,
    AnalysisPageComponent,
    DeviceDetailComponent,
    DevicePanelDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig.firebase, 'steve-io'),
    AngularFireDatabaseModule
  ],
  providers: [DevicesDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
