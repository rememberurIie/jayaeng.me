import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{
  birthDate: Date = new Date('2001-08-31T14:29:00');  // Replace with the actual birth date
  realTimeAge: string = '';
  private intervalId: any;

  constructor() {
    this.calculateRealTimeAge();
  }

  calculateRealTimeAge() {

      const now = new Date();
      const diff = now.getTime() - this.birthDate.getTime();

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
      this.realTimeAge = `${years} years, ${months} months, ${days} days`;

  }

}