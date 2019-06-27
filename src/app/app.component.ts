import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Alexa Player'

  @ViewChild(NavbarComponent)
  private navBarComponent: NavbarComponent

  closeMenu() { }

  ngAfterViewInit() {
    //this.closeMenu = () => this.navBarComponent.closeMenu
    //La documentazione consiglia così
    setTimeout(() => this.closeMenu = () => this.navBarComponent.closeMenu, 0)
  }

  onActivate(event) {
    window.scroll(0, 0)
    this.navBarComponent.closeMenu()
  }
}
