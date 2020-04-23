import { Injectable } from '@angular/core';
import { countries } from 'country-data';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }
  private languageCode = 'US';
  private countryCode: string;
  private currencyCode = 'USD';
  initialize() {
    fetch('https://api.ipify.org?format=json')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        fetch(`http://ip-api.com/json/${data.ip}`)
        .then((response) => {
          return response.json();
        })
        .then((data2) => {
          const country = countries.all.find(countryList => countryList.alpha2 === data2.countryCode);
          this.countryCode = data2.countryCode || 'US';
          this.currencyCode = country.currencies[0] || 'USD';
          this.languageCode = navigator.language || 'en-US';
        });
      });
  }

  formatCurrency(amt: number): string {
    return Intl.NumberFormat(this.languageCode, {
      style: 'currency',
      currency: this.currencyCode,
      minimumFractionDigits: 2
    }).format(amt);
  }

  formatNumber(amt: number): string {
    return Intl.NumberFormat(this.languageCode).format(amt);
  }

  capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  fib(amt: number) {
    if (amt < 2) {
      return 1;
    }
    return this.fib(amt - 1) + this.fib(amt - 2);
  }

  levelFib(level: number) {
    return this.fib(level + 15) + this.fib(level  + 14);
  }

  rebirthFib(level: number) {
    return this.fib(level + 21) + this.fib(level  + 21);
  }
}
