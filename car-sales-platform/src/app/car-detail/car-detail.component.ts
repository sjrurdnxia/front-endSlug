import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../car.service';
import { Car } from '../car.model';
import { FileHandle } from '../file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { NgIf, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
  standalone: true,
  imports: [NgIf, RouterModule, MatButtonModule, MatCardModule, CommonModule],
})
export class CarDetailComponent implements OnInit {
  car: Car | undefined;
  imageUrl: string | undefined;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carService.getCarById(+id).subscribe((data: Car) => {
        this.car = data;
        this.setImageUrl();
      });
    }
  }

  setImageUrl(): void {
    if (this.car && this.car.file && this.car.file.length > 0) {
      this.imageUrl = this.car.file[0].url as string;
    }
  }

  deleteCar(): void {
    if (this.car && this.car.id) {
      this.carService.deleteCar(this.car.id).subscribe(() => {
        this.router.navigate(['/cars']);
      });
    }
  }
}
