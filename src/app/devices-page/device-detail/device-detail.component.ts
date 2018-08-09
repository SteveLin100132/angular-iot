import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DevicesDataService } from '../../devices-data.service';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.less']
})
/**
 * [Device Detail的元件]
 * @member {string} id 裝置的uuid
 * @member {function} routeSubscribe 陸遊參數的訂閱
 * @author Steve Lin
 */
export class DeviceDetailComponent implements OnInit, OnDestroy  {

  private id;
  private routeSubscribe;

  /**
   * [建構值]
   * @param {class} router Router類別
   * @param {class} route ActivatedRoute類別
   * @param {class} devicesDataService DevicesDataService類別
   * @returns void
   * @author Steve Lin
   */
  constructor(private router: Router,
              private route: ActivatedRoute,
              private devicesDataService: DevicesDataService) { }

  ngOnInit() {
    this.devicesDataService.setPageTitle('Devices Setting');

    this.routeSubscribe = this.route.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
    });
  }

  ngOnDestroy() {
    this.routeSubscribe.unsubscribe();
  }

}
