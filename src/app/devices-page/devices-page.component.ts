import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { DevicesDataService } from './../devices-data.service';

@Component({
  selector: 'app-devices-page',
  templateUrl: './devices-page.component.html',
  styleUrls: ['./devices-page.component.less']
})
/**
 * [Devices Page的元件]
 * @member {boolean} existAddDevicePanel 新增裝置的面板展開狀態 @default false
 * @member {string} pageTitle Devices Page的標題
 * @member {object[]} devices IoT的裝置資訊
 * @member {class} form 新增裝置的表單群組物件
 * @member {object} formGroupConfig 表單群組物件的設定參數
 * @member {funciton} subscribePageTitle 頁面標題的訂閱
 * @author Steve Lin
 */
export class DevicesPageComponent implements OnInit, OnDestroy {

  private existAddDevicePanel = false;
  private pageTitle;
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

  private subscribePageTitle;

  /**
   * [建構值]
   * @param {class} router Router類別
   * @param {class} devicesDataService DevicesDataService類別
   * @returns void
   * @author Steve Lin
   */
  constructor(private router: Router, private devicesDataService: DevicesDataService) { }

  ngOnInit() {
    this.subscribePageTitle = this.devicesDataService.getPageTitle().subscribe((title) => {
      this.pageTitle = title;
    });

    this.initializeFormGroup(this.formGroupConfig);

    this.devices = this.devicesDataService.getDevices();
  }

  ngOnDestroy() {
    this.subscribePageTitle.unsubscribe();
  }

  /**
   * [初始化新增裝置的表單]
   * @param {object} config 表單控制項設置參數
   * @returns void
   * @author Steve Lin
   */
  initializeFormGroup(config): void {
    this.form = new FormGroup(config);
  }

  /**
   * [顯示新增裝置的表單面板]
   * @returns void
   * @author Steve Lin
   */
  showDevicePanel(): void {
    this.existAddDevicePanel = !this.existAddDevicePanel;
  }

  /**
   * [新增裝置至firebase資料庫]
   * @param {object[]} device 裝置資訊參數
   * @returns void
   * @author Steve Lin
   */
  addNewDevice(device): void {
    const matchDeviceQuantity = this.devices.filter((value) => {
      return value.category === device.category;
    });

    device.uuid = device.category + '-' + (matchDeviceQuantity.length + 1);

    this.devicesDataService.addDevice(device);
  }

  /**
   * [驗證表單中的下拉選單是否有選填]
   * @param {object} control 下拉選單數值的參數
   * @return {object} 回傳一個驗證物件
   */
  validateSelectNotDefault(control): object {
    if (control.value === 'Select Type') {
      return { 'category': true };
    }
  }

}
