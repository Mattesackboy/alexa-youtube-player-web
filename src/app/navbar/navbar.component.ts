import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  closeMenu() {
    $('nav ul').slideUp()
    $('#nav-toggle').removeClass('active')
  }

  ngOnInit() {
    // If a link has a dropdown, add sub menu toggle.
    $('nav ul li a:not(:only-child)').click(function (e) {
      $(this).siblings('.nav-dropdown').toggle()
      // Close one dropdown when selecting another
      $('.nav-dropdown').not($(this).siblings()).hide()
      e.stopPropagation()
    })
    // Clicking away from dropdown will remove the dropdown class
    $('html').click(function () {
      $('.nav-dropdown').hide()
    })
    // Toggle open and close nav styles on click
    $('#nav-toggle').click(function () {
      //fix per inculazione menu se si spamma
      $('#nav-toggle').css('pointer-events', 'none')
      $('nav ul').slideToggle(() => {
        $('#nav-toggle').css('pointer-events', 'auto')
      })
    })
    // Hamburger to X toggle
    $('#nav-toggle').on('click', function () {
      this.classList.toggle('active')
    })
  }

}
