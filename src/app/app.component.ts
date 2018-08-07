import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  @Output()
  hideSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  sidebarState: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  getSidebarState(state: boolean): void {
    this.sidebarState = state;
  }
}
