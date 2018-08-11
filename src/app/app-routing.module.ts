import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevicesPageComponent } from './devices-page/devices-page.component';
import { DevicesComponent } from './devices-page/devices/devices.component';
import { DeviceDetailComponent } from './devices-page/device-detail/device-detail.component';
import { AnalysisPageComponent } from './analysis-page/analysis-page.component';

// 路遊參數設定
const routes: Routes = [
  { path: '', redirectTo: 'devices', pathMatch: 'full' },
  {
    path: 'devices', component: DevicesPageComponent,
    children: [
      { path: '', component: DevicesComponent },
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
