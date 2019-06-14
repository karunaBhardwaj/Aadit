import { Component } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private menuCtrl: MenuController,
    public modalController: ModalController,
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }


}
