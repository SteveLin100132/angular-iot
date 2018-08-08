import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

import { Devices } from './devices';

@Injectable({
  providedIn: 'root'
})
export class DevicesDataService implements OnInit {

  private devices = [];
  private devicesDataUrl = 'src/mock-data/mock-devices.json';

  private firebaseObservable: Observable<any[]>;

  constructor(private http: HttpClient, private firebaseDatabase: AngularFireDatabase) {}

  ngOnInit() {
  }

  fetchDevicesData() {
    return this.firebaseDatabase.list('/devices').valueChanges();
  }

  // fetchDevicesData(): Observable<Devices[]> {
  //   return this.http.get<Devices[]>(this.devicesDataUrl);
  // }

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
    this.devices.push(device);
    this.firebaseDatabase.object('/devices').set(this.devices);
  }

}
