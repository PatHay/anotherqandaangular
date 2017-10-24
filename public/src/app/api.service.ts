import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Question } from './question';
import "rxjs/Rx";

@Injectable()
export class ApiService {

  private user = '';
  private questions = [];
  private answers = [];

  constructor(private _http: Http,) {
    this.getQ();
  }

  answerCheck(){
    return this.answers;
  }

  login(user){
    this.user = user;
    // console.log(this.user);
  }
    
  whoUser(){
    return this.user;
  }

  logout(){
    this.user="";
  }

  arrayQ(){
    return this.questions;
  }

  arrayA(){
    return this.answers;
  }

  refreshQ(){
    this.questions = [];
  }

  clearAnswers(){
    this.answers.length = 0;
  }

  getQ(){
    var allQuestions = this._http.get('/questions')
    .map(data => data.json())
    .toPromise()

  allQuestions.then(data => {      //cleans up the initial response data
    console.log(data);
    for (var i = 0; i < data['questions'].length; i++) {
      // var created_at_clean = data['notes'][i].created_at; //grab the created at from data and set to var
      // var created_at = new Date(created_at_clean); // Clean up date
      // var newNote = new Note(data['notes'][i].text, created_at); // create a new Note from Note class using clean date
      // this._notes.push(newNote); //push new note in line above to an array in component
      this.questions.push(data['questions'][i]) //Iterating through json response and pushing each item into an array for storage
    }
  });
}

  createQ(formData){
    formData.user = this.user;
    formData.created_at = new Date();
    this._http.post('/questions', formData).toPromise()
    .then(data => {
      console.log(`Data response from question creation ${data}`)
    })
    .catch(err =>{
      console.log(`Error response during question creation`)
    });

  }

  getAnswers(id) {
    var allAnswers = this._http.get(`/question/${id}`)
      .map(data => data.json())
      .toPromise()

    allAnswers.then(data => { 
      console.log(data);
      console.log(data['answers']);
      for (var i = 0; i < data['answers'].length; i++) {
        this.answers.push(data['answers'][i]) //Iterating through json response and pushing each item into an array for storage
      }
    });
  }

  createA(formData, id){
    formData.user = this.user;
    formData.created_at = new Date();

    this._http.post(`/question/${id}/new_answer`, formData).toPromise()
      .then(data => {
        console.log("inside then of promise in post")
        console.log(data)
      })
      .catch(err => {
        console.log("in api service promise catch")
        console.log(err)
      });

  }

  updateAnswer(info, id){
    this._http.put(`/question/${id}`, info).toPromise()
    .then(data =>{
      console.log("inside then of promise in put")
      console.log(data)
    })
    .catch(err => {
      console.log("in api service promise catch of put")
      console.log(err)
    });
  }

}
