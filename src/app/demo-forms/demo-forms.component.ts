import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {PreviewAnswerDialogComponent} from '../preview-answer-dialog/preview-answer-dialog.component';
import {AnswersService} from '../shared/services/answers.service';

@Component({
  selector: 'app-demo-forms',
  templateUrl: './demo-forms.component.html',
  styleUrls: ['./demo-forms.component.scss']
})
export class DemoFormsComponent implements OnInit {
  public readonly title: string;
  public formGroup: FormGroup;
  public isDisabled: boolean;
  public isSubmitted: boolean;
  private allServices: string[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
    private _answersService: AnswersService
  ) {
    this.title = 'Welcome to the Demo Forms Builder';
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.formGroup = this._formBuilder.group({
      about_yourself: ['', []],
      software_development: ['', []],
      customer_support: ['', []],
      other: ['', []],
      add_question: ['', []],
      more_information: ['', []],
      include_option: ['', []],
      required_question: ['', []],
      add_answer_options: this._formBuilder.array([]),
    });

    if (this.formGroup.touched) this.isSubmitted = false;
  }

  get answerOptions(): FormArray {
    return this.formGroup.get('add_answer_options') as FormArray;
  }

  public onSubmit(values): void {
    this.formGroup.get('add_question').updateValueAndValidity();
    this.isSubmitted = true;
    this.isDisabled = this.formGroup.get('add_question').errors && this.formGroup.get('add_question').errors.required;
    this._answersService.answersSubject.next(values);
  }

  public toggleRequired(event): void {
    (event.checked)
      ? this.formGroup.get('add_question').setValidators(Validators.required)
      : this.formGroup.get('add_question').clearValidators();
  }

  public addAnswerOption(event): void {
    if (!event.checked) return;

    const answerOption = this._formBuilder.group({
      new_answer_option: ['', []]
    });

    this.answerOptions.push(answerOption);
  }

  public selectServices(event): void {
    (event.checked)
      ? this.allServices.push(event.source.value)
      : this.allServices = this.allServices.filter((service: string) => service !== event.source.value);

    this._answersService.allServiceSubject.next(this.allServices);
  }

  public deleteOption(index: number): void {
    this.answerOptions.removeAt(index);
  }

  public openDialog(): void {
    this._dialog.open(PreviewAnswerDialogComponent);
  }
}
