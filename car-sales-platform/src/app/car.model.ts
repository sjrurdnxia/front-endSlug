import { FileHandle } from "./file-handle.model";

export interface Car {
    id: number; // Ensure id is of type number and required
    make: string;
    model: string;
    manufactureYear: number;
    price: number;
    ownerId: number;
    file: FileHandle[];
  }
  