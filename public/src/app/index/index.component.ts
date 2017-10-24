import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { RouterModule, Routes, Router }  from '@angular/router';
import { Http } from '@angular/http';
import { Question } from './../question';
import "rxjs/Rx";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  user = ''
  questions = [];

  constructor(
    private _apiService: ApiService,
    private router: Router,
    private _http: Http,
    ) {
    this.questions = this._apiService.arrayQ();
    this.user = this._apiService.whoUser(); //Injectable
    this._apiService.clearAnswers();  // clear out answers array in service upon each visit to index
  }

  ngOnInit() {
    // console.log(this.user);
    console.log(`Questions array in index ${this.questions}`);
  }

  logout(){
    this._apiService.logout();
  }

}
