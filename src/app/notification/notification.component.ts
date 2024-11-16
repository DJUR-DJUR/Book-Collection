import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { MAT_SNACK_BAR_DATA, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { MessageStyle, NotificationData } from './notification.api';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MatSnackBarModule, MatIconModule, NgClass, MatButtonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  notificationData: NotificationData = inject(MAT_SNACK_BAR_DATA)
  snackBarRef = inject(MatSnackBarRef)
  icon: string = this.getIconByStyle()

  getIconByStyle(): string {
    let icon

    switch (this.notificationData.style) {
      case MessageStyle.Error:
        icon = 'warning'
        break
      case MessageStyle.Success:
        icon = 'check_circle'
        break
      case MessageStyle.Neutral:
      default:
        icon = 'error'
        break
    }

    return icon
  }
}
