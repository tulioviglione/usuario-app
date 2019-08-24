import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.serice';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
  selector: 'an-signup',
  templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  @ViewChild('emailInput', { static: true }) emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signUpService: SignUpService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      fullName: ['', 
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      userName: ['', 
      [
        Validators.required,
        Validators.pattern(/^[a-z0-9_\-]+$/),
        Validators.minLength(2),
        Validators.maxLength(30)
      ],
      this.userNotTakenValidatorService.checkUserNameTaken()
    ],
      password: ['', 
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(14)
      ]
    ]
    }) 
    this.platformDetectorService.isPlatformBrowser() &&
            this.emailInput.nativeElement.focus(); 
  }

  signup() {
    const newUser = this.signupForm.getRawValue() as NewUser;
    this.signUpService
        .signup(newUser)
        .subscribe(
            () => this.router.navigate(['']),
            err => console.log(err)
        );
  }

}