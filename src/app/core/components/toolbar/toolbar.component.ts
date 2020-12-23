import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-toolbar',
  templateUrl: 'toolbar.component.html',
  styles: [`/* Add a black background color to the top navigation */
  .topnav {
    position: relative;
    background-color: #333;
    overflow: hidden;
  }
  
  /* Style the links inside the navigation bar */
  .topnav a {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }
  
  /* Change the color of links on hover */
  .topnav a:hover {
    background-color: #ddd;
    color: black;
  }
  
  /* Add a color to the active/current link */
  .topnav a.active {
    background-color: #4CAF50;
    color: white;
  }
  
  /* Centered section inside the top navigation */
  .topnav-centered a {
    float: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  /* Right-aligned section inside the top navigation */
  .topnav-right {
    float: right;
  }
  
  /* Responsive navigation menu - display links on top of each other instead of next to each other (for mobile devices) */
  @media screen and (max-width: 600px) {
    .topnav a, .topnav-right {
      float: none;
      display: block;
    }
  
    .topnav-centered a {
      position: relative;
      top: 0;
      left: 0;
      transform: none;
    }
  }`]
})
export class ToolbarComponent implements OnInit {
  
  ngOnInit() {
  }

  constructor(private _location: Location) {
  }
  regresar() {
      this._location.back();
  }

}
