import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

// import { Observable } from 'rxjs/Rx';
import { Observable } from '../../node_modules/rxjs';

import { Devices } from './devices';

@Injectable({
  providedIn: 'root'
})
export class DevicesDataService implements OnInit {

  devices = [];

  private devicesDataUrl = 'src/mock-data/mock-devices.json';

  constructor(private http: HttpClient) {}

  ngOnInit() {
  }

  fetchDevicesData(): Observable<Devices[]> {
    return this.http.get<Devices[]>(this.devicesDataUrl);
  }

  setDevices(devices) {
    this.devices = devices;
  }

  getDevices() {
    return this.devices;
  }

  getDevicesWith(condition: string) {
    const keyCondition = condition;
    const matchDevices = this.devices.filter((value) => {
      const device = value;
      let matchDevice;

      for (const key in device) {
        if (device[key] === keyCondition) {
          matchDevice = device;
          break;
        }
      }

      return matchDevice;
    });

    return matchDevices;
  }

  addDevice(device): void {
    console.log(this.devices);
    this.devices.push(device);
  }

}
