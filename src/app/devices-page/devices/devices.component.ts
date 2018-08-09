import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { DevicesDataService } from '../../devices-data.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.less']
})
/**
 * [Devices的元件]
 * @member {object[]}} devices 裝置的資訊
 * @member {funciton} subscribeDevices 裝置資訊的訂閱
 * @author Steve Lin
 */
export class DevicesComponent implements OnInit, OnDestroy {

  private devices;

  private subscribeDevices;

  /**
   * [建構值]
   * @param {class} router Router類別
   * @param {class} devicesDataService DevicesDataService類別
   * @returns void
   * @author Steve Lin
   */
  constructor(private router: Router, private devicesDataService: DevicesDataService) { }

  ngOnInit() {
    this.devicesDataService.setPageTitle('Devices List');

    this.subscribeDevices = this.devicesDataService.fetchDevicesData().subscribe((value) => {
      this.devices = value;
      this.devicesDataService.setDevices(this.devices);
    });
  }

  ngOnDestroy() {
    this.subscribeDevices.unsubscribe();
  }

  /**
   * [選取對應裝置後進到裝置的細節頁面]
   * @param {string} uuid 裝置的uuid
   * @returns void
   * @author Steve Lin
   */
  selectDevice(uuid: string): void {
    this.router.navigate(['devices/device', uuid]);
  }

}
