import { Injectable, inject } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef} from '@angular/material/snack-bar';
import { NotificationData } from './notification.api';
import { NotificationComponent } from './notification.component';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private readonly snackBar = inject(MatSnackBar)

    showNotification(options: NotificationData): MatSnackBarRef<NotificationComponent> {
        const config: MatSnackBarConfig = { data: options }
        config.duration = options.duration ?? 5000
        return this.snackBar.openFromComponent(NotificationComponent, config)
    }
}
