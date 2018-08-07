import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.less']
})
export class DeviceDetailComponent implements OnInit, OnDestroy  {

  id: string;
  routeSubscribe: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    /**
     * [subscribe]
     * 在訂閱情況下，若再次改變Router的路徑，則可以再次取得參數。
     * @param  {ParamMap} (params [description]
     */
    this.routeSubscribe = this.route.paramMap.subscribe((params: any) => {
      this.id = params.get('id');
    });

    /**
     * 此方法無法再次取的參數。
     * this.id = this.route.snapshot.paramMap.get('id');
     */
  }

  ngOnDestroy() {
    this.routeSubscribe.unsubscribe();
  }

}
