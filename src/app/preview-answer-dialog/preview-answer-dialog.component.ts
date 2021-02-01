import {Component, OnInit} from '@angular/core';
import {AnswersService} from '../shared/services/answers.service';

@Component({
  selector: 'app-preview-answer-dialog',
  templateUrl: './preview-answer-dialog.component.html',
  styleUrls: ['./preview-answer-dialog.component.scss']
})
export class PreviewAnswerDialogComponent implements OnInit {
  public services: string[];
  public answers: { [k: string]: any };

  constructor(private _answersService: AnswersService) {
  }

  ngOnInit(): void {
    this._answersService.allServices.subscribe((services: string[]) => this.services = services);
    this._answersService.answers.subscribe((answers: { [k: string]: any }) => this.answers = answers);
  }
}
