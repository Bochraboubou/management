import { Component, OnInit } from '@angular/core';
import { Metier } from 'src/app/model/Metier';

@Component({
  selector: 'app-marchee',
  templateUrl: './marchee.component.html',
  styleUrls: ['./marchee.component.css']
})
export class MarcheeComponent implements OnInit {
  metiers!: Metier[];

  constructor() { }

  ngOnInit(): void {
  }
  public onOpenBCModal():void{
    const container=document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    button.setAttribute('data-target','#addBCModal');
    container?.appendChild(button);
    button.click();
    

  }

}
