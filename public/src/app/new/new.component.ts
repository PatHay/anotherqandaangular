import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { Http } from '@angular/http';
import { Question } from './../question';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  user = "";

  newQuestion: Question = new Question(
    "", "", "", ""
  );
    
  constructor(
    private _apiService: ApiService,
    private router: Router,
    private _http: Http,
  ) {
    this.user = this._apiService.whoUser();
    // console.log(this.user);
  }

  ngOnInit() {
  }

  onSubmit(){
    this._apiService.createQ(this.newQuestion)

  //Resetting new Question to blank
  this.newQuestion = new Question(
    "",
    "",
    "",
    ""
  );
  this._apiService.refreshQ();  // clear out current service questions array
  this._apiService.getQ();  // get new array list
  this.router.navigateByUrl("/questions");   //Navigate back to index
  }

}
