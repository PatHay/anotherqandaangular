import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';
import { RouterModule, Routes, Router, ParamMap, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Question } from './../question';
import { Answer } from './../answer';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  id;
  questions = [];
  question = [];
  newAnswer: Answer = new Answer(
    "",
    "",
    "",
    0,
    ""
  );

  constructor(
    private _apiService: ApiService,
    private router: Router,
    private _http: Http,
    private _route: ActivatedRoute,
  ) {
    this.questions = this._apiService.arrayQ();
  }

  ngOnInit() {
    this.getQuestion();
  }

  getQuestion(){
    this._route.params.subscribe( param => {
      for ( let i = 0; i < this.questions.length; i++){
        if(this.questions[i]._id == param.id){
          this.id = param.id;
          this.question = this.questions[i];  //Setting question to our selected id
          break;
        }
      }
    });
  }

  onSubmit() {
    // console.log("Answer in answer")
    // console.log(`${this.newAnswer}`)
    // console.log(this.newAnswer.answer);
    // console.log(this.question);

    this._apiService.createA(this.newAnswer, this.id);
    this.newAnswer = new Answer(
      "",
      "",
      "",
      0,
      ""
    );
    this._apiService.refreshQ();  // clear out current service questions array
    this._apiService.getQ();  // get new array list
    this.router.navigateByUrl("/questions");
  }

}
