import { Component, OnInit } from '@angular/core';
import { Brand } from '../../models/brand';
import { Color } from '../../models/color';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorService } from '../../services/color.service';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-cars-filter',
  templateUrl: './cars-filter.component.html',
  styleUrl: './cars-filter.component.css'
})
export class CarsFilterComponent implements OnInit{
  
  ngOnInit(): void {
    
    this.acticatedRote.queryParams.subscribe(params=>{
      console.log(params);
    })
    this.loadBrandsAndColors();
  }

  brands: Brand[];
  colors: Color[];
  selectedBrand: string = '';
  selectedColor: string = '';
  filteredCars:string="";

  constructor(private acticatedRote:ActivatedRoute,private colorService:ColorService
    , private brandService:BrandService, private router:Router) {
    
  }

  clearFilters(){
    this.selectedBrand = '';
    this.selectedColor = '';
  
    this.router.navigate([]);
  }
  
 loadBrandsAndColors() {
     this.brandService.getAll().subscribe(data => {
      this.brands = data.data;
      
    },err=> console.log(err),()=>{
      this.colorService.getAll().subscribe(res => {
        this.colors = res.data;
      });
    });
  }
  
  createRouterLink(){
    this.router.navigate(['/cars'], {
      queryParams: { brandId: this.selectedBrand, colorId: this.selectedColor }
    });
  }

}
