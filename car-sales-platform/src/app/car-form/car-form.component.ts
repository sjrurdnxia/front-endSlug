import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../car.service';
import { Car } from '../car.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ]
})
export class CarFormComponent implements OnInit {
  carForm: FormGroup;
  carId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.carForm = this.fb.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      manufactureYear: ['', Validators.required],
      price: ['', Validators.required],
      ownerId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.carId = Number(params.get('id'));
      if (this.carId) {
        this.carService.getCarById(this.carId).subscribe((car: Car) => {
          this.carForm.patchValue(car);
        });
      }
    });
  }

  saveCar(): void {
    if (this.carForm.valid) {
      const carData = this.carForm.value;
      if (this.carId) {
        // If there's an id, update the existing car
        this.carService.updateCar(this.carId, carData).subscribe(() => {
          this.router.navigate(['/cars']);
        });
      } else {
        // Otherwise, create a new car
        this.carService.addCar(carData).subscribe(() => {
          this.router.navigate(['/cars']);
        });
      }
    }
  }
}
