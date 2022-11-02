import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() count: number = 0
  @Input() description: string = ''

  @Output() onClick = new EventEmitter()


  constructor() { }

  ngOnInit(): void {
  }

}
