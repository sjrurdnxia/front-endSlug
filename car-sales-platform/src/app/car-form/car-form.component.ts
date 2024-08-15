import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CarService } from '../car.service';
import { Car } from '../car.model';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class CarFormComponent implements OnInit {
  car: Car = {
    id: 0,
    make: '',
    model: '',
    manufactureYear: 0,
    price: 0,
    ownerId: 0,
    picture: ''
  };
  selectedFile: File | null = null;

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  saveCar(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.carService.uploadFile(formData).subscribe(response => {
        this.car.picture = response;
        this.saveCarDetails();
      });
    } else {
      this.saveCarDetails();
    }
  }

  saveCarDetails(): void {
    this.carService.addCar(this.car).subscribe(() => {
      this.router.navigate(['/cars']);
    });
  }
}
