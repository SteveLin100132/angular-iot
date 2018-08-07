import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevicesPageComponent } from './devices-page/devices-page.component';
import { DeviceDetailComponent } from './devices-page/device-detail/device-detail.component';
import { AnalysisPageComponent } from './analysis-page/analysis-page.component';

const routes: Routes = [
  { path: '', component: DevicesPageComponent },
  {
    path: 'devices', component: DevicesPageComponent,
    children: [
      { path: '', redirectTo: 'device', pathMatch: 'full' },
      { path: 'device/:id', component: DeviceDetailComponent }
    ]
  },
  { path: 'analysis', component: AnalysisPageComponent },
  { path: '**', component: DevicesPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
