import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import {DynamicDialogRef, DynamicDialogConfig} from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss']
})
export class CodeInputComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CodeInputComponent>) { }

  ngOnInit(): void {
  }

  correctIcon = faCheck;
  wrongIcon = faTimes;

  correctInput = false;
  wrongInput = false;

  codeEntered(event): void {
    let code = event.target.value;
    if(code.length < 3) {
      this.correctInput = false;
      this.wrongInput = false;
      return;
    }
    if(code == this.data.code) {
      console.log("correct code!");
      this.correctInput = true;
      this.wrongInput = false;

      setTimeout(() => this.dialogRef.close(true), 800);
    } else {
      console.log("wrong code!");
      this.wrongInput = true;
      this.correctInput = false;
      setTimeout(() => this.dialogRef.close(false), 800);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
