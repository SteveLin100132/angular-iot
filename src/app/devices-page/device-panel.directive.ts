import { Directive, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appDevicePanel]'
})
export class DevicePanelDirective implements OnInit {

  @Input()
  appDevicePanel;

  ngOnInit() {
  }

}
