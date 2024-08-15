import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CarService } from '../car.service';
import { Car } from '../car.model';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ]
})
export class CarDetailComponent implements OnInit {
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
  imageUrl: string | ArrayBuffer | null = '';

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.carService.getCarById(id).subscribe((data) => {
      this.car = data;
      this.imageUrl = data.picture;
    });
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => this.imageUrl = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
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
    this.carService.updateCar(this.car.id!, this.car).subscribe(() => {
      this.router.navigate(['/cars']);
    });
  }

  deleteCar(): void {
    this.carService.deleteCar(this.car.id!).subscribe(() => {
      this.router.navigate(['/cars']);
    });
  }
}
