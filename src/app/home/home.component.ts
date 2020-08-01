import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private router: Router) { }
  public showAdditionBar = false;

  ngOnInit() {
    let items = document.querySelectorAll('.circle button');
    let itemsHr = document.querySelectorAll('.circle .separator') ;
    for (let i = 0, l = items.length; i < l; i++) {
      let t = 50;
      let r = 31;
      (items[i] as HTMLElement).style.left = (t - r * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
      (items[i] as HTMLElement).style.top = (t + r * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
    }

    for (let i = 0, l = itemsHr.length; i < l; i++) {
      let t = 50;
      let r = 34;
      (itemsHr[i] as HTMLElement).style.left = (t - r * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * (i + 0.5) * Math.PI)).toFixed(4) + "%";
      (itemsHr[i] as HTMLElement).style.top = (t + r * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * (i + 0.5) * Math.PI)).toFixed(4) + "%";
      let hrdeg = (360 / l) * i + (360 / l) / 2;
      (itemsHr[i] as HTMLElement).style.transform = "rotate(" + hrdeg + "deg)";
    }

  }

  public toUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  public showingSidebar = false;


}
