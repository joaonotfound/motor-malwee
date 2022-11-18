import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'm-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() style: 'primary' | 'light' = 'primary'
  @Input() icon: string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
