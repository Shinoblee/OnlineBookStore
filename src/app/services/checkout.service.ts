import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CheckoutService {
  constructor() {}

  getCreditCardMonths(): Observable<number[]> {
    const currentMonth: number = new Date().getMonth() + 1;
    let data: number[] = [];
    for (let month = currentMonth; month <= 12; month++) {
      data.push(month);
    }

    return of(data);
  }

  getCreditCardYears(): Observable<number[]> {
    const currentYear: number = new Date().getFullYear();
    let data: number[] = [];
    for (let year = currentYear; year <= currentYear + 15; year++) {
      data.push(year);
    }

    return of(data);
  }
}
