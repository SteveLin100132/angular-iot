import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AngularFireDatabase  } from 'angularfire2/database';

import { DevicesDataService } from './../devices-data.service';

@Component({
  selector: 'app-devices-page',
  templateUrl: './devices-page.component.html',
  styleUrls: ['./devices-page.component.less']
})
export class DevicesPageComponent implements OnInit, OnDestroy {

  // View property
  private existAddDevicePanel = false;
  private pageTitle = 'Devices Page';
  private devices;
  private form: FormGroup;
  private formGroupConfig = {
    name: new FormControl('', Validators.compose([
      Validators.required,
      Validators.maxLength(10),
      Validators.pattern('^[\u4e00-\u9fa5a-zA-Z0-9]+$')
    ])),
    category: new FormControl('Select Type', Validators.compose([
      Validators.required,
      this.validateSelectNotDefault
    ])),
    ioType: new FormControl('read', Validators.required)
  };

  // Observer subscribe
  // private subscribeDevices;
  private subscribeFirebase;

  // Observable
  firebaseObservale: Observable<any[]>;
 
  constructor(private router: Router, private firebaseDB: AngularFireDatabase, private devicesDataService: DevicesDataService) { }
  
  ngOnInit() {
    this.firebaseObservale = this.firebaseDB.list('/devices').valueChanges()
    this.subscribeFirebase = this.firebaseObservale.subscribe((value) => {
      this.devices = value;
      this.devicesDataService.setDevices(this.devices);
    });

    // this.subscribeDevices = this.devicesDataService.fetchDevicesData().subscribe((data) => {
    //   this.devices = data;
    //   this.devicesDataService.setDevices(this.devices);
    // });

    this.initializeFormGroup(this.formGroupConfig)
  }

  ngOnDestroy() {
    this.subscribeFirebase.unsubscribe();
    // this.subscribeDevices.unsubscribe();
  }

  initializeFormGroup(config) {
    this.form = new FormGroup(config);
  }

  selectDevice(uuid: string): void {
    this.router.navigate(['devices/device', uuid]);
  }

  showDevicePanel(): void {
    this.existAddDevicePanel = !this.existAddDevicePanel;
  }

  addNewDevice(device): void {
    const matchDeviceQuantity = this.devices.filter((value) => {
      return value.category === device.category;
    });

    device.uuid = device.category + '-' + (matchDeviceQuantity.length + 1);

    this.devicesDataService.addDevice(device);
  }

  validateSelectNotDefault(control) {
    if (control.value === 'Select Type') {
      return { 'category': true };
    }
  }

}
