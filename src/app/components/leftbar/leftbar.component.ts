import { Component, OnInit } from '@angular/core';
import { GenericResponse } from '../../models/genericResponse';
import { Color } from '../../models/color';
import { Brand } from '../../models/brand';
import { ColorService } from '../../services/color.service';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-leftbar',
  templateUrl: './leftbar.component.html',
  styleUrl: './leftbar.component.css'
})
export class LeftbarComponent implements OnInit {

  ngOnInit(): void {
    this.colorService.getAll().subscribe(resp=>{
      this.colorResponse = resp;
      this.brandService.getAll().subscribe(resp=>{
        this.brandResponse = resp;
      });
     });
    
  }

  colorResponse:GenericResponse<Color[]>;
  brandResponse:GenericResponse<Brand[]>;

  constructor(private colorService:ColorService, private brandService:BrandService) {
    
  }

}
