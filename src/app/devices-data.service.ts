import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
/**
 * [裝置Service]
 * @member {object[]} devices IoT的裝置資訊
 * @member {interface} titleObserver 頁面標題的觀察者
 * @member {class} titleObservable 頁面標題的可觀察物件
 * @member {class} firebaseObservable firebase的可觀察物件
 * @author Steve Lin
 */
export class DevicesDataService {

  private devices = [];
  // private devicesDataUrl = 'src/mock-data/mock-devices.json';

  private titleObserver: Observer<string[]>;

  private titleObservable: Observable<string[]>;
  private firebaseObservable: Observable<any[]>;

  /**
   * [建構值]
   * @param {class} http HTTP類別
   * @param {class} firebaseDatabase firebase的資料庫類別
   * @returns void
   * @author Steve Lin
   */
  constructor(private http: HttpClient, private firebaseDatabase: AngularFireDatabase) {
    this.titleObservable = new Observable((observer: Observer<string[]>) => {
      this.titleObserver = observer;
    });
  }

  /**
   * [設定頁面的標題]
   * @param {string} title 標題參數
   * @returns void
   * @author Steve Lin
   */
  setPageTitle(title: string): void {
    this.titleObserver.next([title]);
  }

  /**
   * [取得頁面的標題]
   * @returns {class} 傳回一個可觀察類別
   * @author Steve Lin
   */
  getPageTitle(): Observable<string[]> {
    return this.titleObservable;
  }

  /**
   * [至firebase抓取裝置的資訊]
   * @returns {class} 傳回一個可觀察類別
   * @author Steve Lin
   */
  fetchDevicesData(): Observable<any[]> {
    return this.firebaseDatabase.list('/devices').valueChanges();
  }

  // fetchDevicesData(): Observable<Devices[]> {
  //   return this.http.get<Devices[]>(this.devicesDataUrl);
  // }

  /**
   * [設定裝置資訊至Service形成單例]
   * @param {object[]} devices 裝置資訊的參數
   * @returns void
   * @author Steve Lin
   */
  setDevices(devices): void {
    this.devices = devices;
  }

  /**
   * [取得裝置的資訊]
   * @returns {object[]} 傳回裝置資訊的物件
   * @author Steve Lin
   */
  getDevices(): object[] {
    return this.devices;
  }

  /**
   * [有條件地取得裝置的資訊]
   * @param {string} condition 設置裝置的檢索條件
   * @returns {object[]} 傳回府和條件的裝置資訊物件
   * @author Steve Lin
   */
  getDevicesWith(condition: string): object[] {
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

  /**
   * [新增裝置資訊至firebase]
   * @param {object} device 裝置資訊的參數
   * @returns void
   * @author Steve Lin
   */
  addDevice(device): void {
    const category = device.category;
    const uuidIndex = this.devices.filter((value) => {
      return value.category === device.category;
    })
    .map(value => parseInt(value.uuid.replace((category + '-'), ''), 10))
    .sort((a, b) => {
      return a - b;
    });

    if (uuidIndex.length !== 0) {
      for (let i = 0; i < uuidIndex.length; i++) {
        if ((i + 1) !== uuidIndex[i]) {
          device.uuid = category + '-' + (i + 1);
          break;
        } else if ((i + 1) === uuidIndex.length) {
          device.uuid = category + '-' + (uuidIndex.length + 1);
        }
      }
    } else {
      device.uuid = category + '-1';
    }

    this.devices.push(device);
    this.firebaseDatabase.object('/devices').set(this.devices);
  }

  /**
   * [在firebase中移除指定裝置]
   * @param {any} device 欲移除的裝置
   * @returns void
   * @author Steve Lin
   */
  deleteDevice(device: any): void {
    const remainDevices = this.devices.filter((value) => {
      if (value.uuid !== device.uuid) {
        return value;
      }
    });

    this.firebaseDatabase.object('/devices').set(remainDevices);
  }

}
