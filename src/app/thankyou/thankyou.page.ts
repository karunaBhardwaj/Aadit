import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.page.html',
  styleUrls: ['./thankyou.page.scss'],
})
export class ThankyouPage implements OnInit {

  constructor(    private menuCtrl: MenuController,
    ) { }

  ionViewWillEnter() {

    this.menuCtrl.enable(true);
  }
  ngOnInit() {
    this.ionViewWillEnter()
  }

}
