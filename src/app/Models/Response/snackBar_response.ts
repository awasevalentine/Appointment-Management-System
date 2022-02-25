import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class ResponseNotification {

    constructor(private _snackBar: MatSnackBar){

    }

    Response(message: string) {
      this._snackBar.open(message, 'ok', {
        horizontalPosition: "center",
        verticalPosition: "top",
        duration: 5000
      });
    }
}