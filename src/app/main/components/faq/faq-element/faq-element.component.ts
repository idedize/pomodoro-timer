import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-element',
  templateUrl: './faq-element.component.html',
  styleUrls: ['./faq-element.component.scss']
})
export class FaqElementComponent implements OnInit {

  @Input() question: string;
  @Input() answer: string;
  @Input() link: string;
  @Input() linkName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
