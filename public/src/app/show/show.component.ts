import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { Question } from './../question';
import { Answer } from './../answer';
import { RouterModule, Routes, Router, ParamMap, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  allQuestions = []; //all questions in database
  question =[]; //stored question based on the params id

  id;
  allAnswers = []; //all answers in the stored question

  constructor(
    private _apiService: ApiService,
    private router: Router,
    private _http: Http,
    private _route: ActivatedRoute,
  ) {
    // console.log("Show Constructor")
    this.allQuestions = this._apiService.arrayQ();
  }


  ngOnInit() {
    this.getQuestion();  // function will also set id
    this._apiService.getAnswers(this.id);  //using id that was set in function above to get answers from DB and put into service
    this.allAnswers = this._apiService.arrayA(); //populate answers array from service
    console.log(this.allAnswers);
  }

  getQuestion(){
    this._route.params.subscribe( param => {
      for ( let i = 0; i < this.allQuestions.length; i++){
        if(this.allQuestions[i]._id == param.id){
          this.id = param.id;
          this.question = this.allQuestions[i];  //Setting question to our selected id
          break;
        }
      }
    });
  }

  like(i){
    this.allAnswers[i]['like']++;
  }

  saveLike(){
    // this._apiService.clearAnswers();
    for(var i=0; i<this.allAnswers.length; i++){ //loop through all answers in answer array
      this._apiService.updateAnswer(this.allAnswers[i], this.allAnswers[i]._id); //updating each answer in db
      // console.log(this.allAnswers[i]);
    }
    this._apiService.clearAnswers(); //clear out answers array in service
    console.log("Answer check")
    console.log(this._apiService.answerCheck());
    this.allAnswers.length = 0; //reset answer array in show component 
  }

}