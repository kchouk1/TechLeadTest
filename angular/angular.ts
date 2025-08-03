import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { User, UpdateUserRequest } from "./interfaces/user.interface";

@Component({
  selector: "app-user-profile",
  template: `
    <div class="user-profile">
      <div *ngIf="loading" class="loading">Loading...</div>
      <div *ngIf="error" class="error">{{ error }}</div>

      <div *ngIf="user && !loading" class="user-form">
        <h2>User Profile</h2>

        <form (ngSubmit)="updateUser()">
          <div class="form-group">
            <label for="name">Name:</label>
            <input
              id="name"
              [(ngModel)]="user.name"
              [disabled]="loading"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input
              id="email"
              type="email"
              [(ngModel)]="user.email"
              [disabled]="loading"
              required
            />
          </div>

          <button type="submit" [disabled]="loading">Update User</button>
        </form>

        <div class="password-section">
          <h3>Change Password</h3>
          <input
            #passwordInput
            type="password"
            placeholder="New password"
            [disabled]="loading"
          />
          <button
            (click)="
              changePassword(passwordInput.value); passwordInput.value = ''
            "
            [disabled]="loading"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  `,
})
export class UserProfileComponent implements OnInit {
  user: User | null = null;
  error = "";
  loading = false;
  private readonly userId = 123;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void {
    this.loading = true;
    this.error = "";

    this.userService.getUser(this.userId).subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (err) => {
        this.handleError("Failed to load user", err);
        this.loading = false;
      },
    });
  }

  updateUser(): void {
    if (!this.user) return;

    this.loading = true;
    const updateData: UpdateUserRequest = {
      name: this.user.name,
      email: this.user.email,
    };

    this.userService.updateUser(this.userId, updateData).subscribe({
      next: () => {
        this.loading = false;
        // Handle success (could emit event or show toast)
      },
      error: (err) => {
        this.handleError("Failed to update user", err);
        this.loading = false;
      },
    });
  }

  changePassword(newPassword: string): void {
    if (!newPassword?.trim()) return;

    this.loading = true;
    this.userService
      .changePassword({ id: this.userId, password: newPassword })
      .subscribe({
        next: () => {
          this.loading = false;
          // Handle success
        },
        error: (err) => {
          this.handleError("Failed to change password", err);
          this.loading = false;
        },
      });
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
    this.error = message;
  }
}
