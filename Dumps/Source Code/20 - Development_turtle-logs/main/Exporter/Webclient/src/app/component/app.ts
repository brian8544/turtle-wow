import { Component } from '@angular/core';
import {TranslationService} from "../service/translation";
import {Router} from "@angular/router";

@Component({
  selector: 'root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  title = 'LP Consent Manager';

  constructor(
      private translationService: TranslationService,
      private router: Router
  ) {}
}
