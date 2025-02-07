import { AfterViewInit, Component, OnInit, inject, LOCALE_ID, signal, Inject, PLATFORM_ID } from '@angular/core'; // update this
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ แก้ไข styleUrls
})
export class AppComponent implements OnInit{
  birthDate: Date = new Date('2001-08-31T14:29:00');
  realTimeAge: string = '';
  interval: any;
  isBrowser = signal(false);

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngOnInit() {
    console.log('ngOnInit called');
    this.calculateRealTimeAge(); 
  }
  
  ngOnDestroy(): void {
    if (this.interval) {
      console.log('Clearing interval...');
      clearInterval(this.interval);
    }
  }
  
  calculateRealTimeAge() {
    if (this.interval) return;
  
    if(this.isBrowser()) { // check it where you want to write setTimeout or setInterval
      setInterval(()=> {
      const now = new Date();
      const diff = now.getTime() - this.birthDate.getTime();
  
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds().toString().padStart(2, '0');
  
      this.realTimeAge = `${years} years, ${months} months, ${days} days, ${hours}:${minutes}:${seconds}`;
    }, 1000);
  }   
}
}