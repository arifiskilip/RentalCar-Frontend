import { Component, Input } from '@angular/core';
import { Car } from '../../models/car';
import { Tools } from '../../tools/tools';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrl: './car-detail.component.css'
})
export class CarDetailComponent {
  tool= new Tools();
  @Input() carDetails:Car;
}
