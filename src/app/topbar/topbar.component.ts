import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.less']
})
export class TopbarComponent implements OnInit {

  sidebarState: boolean = true;

  @Output()
  hideSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  changeStete(): void {
    this.sidebarState = !this.sidebarState;
    this.hideSidebar.emit(this.sidebarState);
  }

}
