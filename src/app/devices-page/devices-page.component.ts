import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-devices-page',
  templateUrl: './devices-page.component.html',
  styleUrls: ['./devices-page.component.less']
})
export class DevicesPageComponent implements OnInit, OnDestroy {

  isLoaded: boolean;
  pageTitle: string = "Devices Page";
  devices = [
    { name: "電扇", uuid: "iot-wemos-001" },
    { name: "檯燈", uuid: "iot-wemos-002" },
    { name: "LED燈", uuid: "iot-wemos-003" },
    { name: "超音波", uuid: "iot-wemos-004" },
    { name: "溫度感測器", uuid: "iot-wemos-005" },
    { name: "濕度感測器", uuid: "iot-wemos-006" },
    { name: "機器人管家", uuid: "iot-wemos-007" },
    { name: "電腦LED燈", uuid: "iot-wemos-008" },
    { name: "濕度感測器", uuid: "iot-wemos-009" },
    { name: "機器人管家", uuid: "iot-wemos-010" },
    { name: "電腦LED燈", uuid: "iot-wemos-011" }
  ];

  constructor(private router: Router, private elementRef: ElementRef) { }

  ngOnInit() {
    this.isLoaded = true;
  }

  ngOnDestroy() {
  }

  selectDevice(uuid: string): void {
    this.router.navigate(['devices/device', uuid]);
    this.isLoaded = false;
  }

}
