import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { AnswerComponent } from './answer/answer.component';

const APP_ROUTES: Routes = [
    { path: '', component: LoginComponent , pathMatch: 'full' },
    { path: 'questions', component: IndexComponent },
    { path: 'new_question', component: NewComponent },
    { path: 'question/:id', component: ShowComponent },
    { path: 'question/:id/new_answer', component: AnswerComponent }
];
export const routing = RouterModule.forRoot(APP_ROUTES);