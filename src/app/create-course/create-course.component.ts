import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from '../model/course';
import { catchError, concatMap, last, map, take, tap } from 'rxjs/operators';
import { from, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;
import { CourseService } from '../services/course.service';

@Component({
  selector: 'create-course',
  templateUrl: 'create-course.component.html',
  styleUrls: ['create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  form = this.fb.group({
    description: ['', Validators.required],
    category: ['BEGINNER', Validators.required],
    url: ['', Validators.required],
    longDescription: ['', Validators.required],
    promo: [false],
    promoStartAt: [null],
  })

  courseId: string = '';

  constructor(private fb: FormBuilder,
    private afs: AngularFirestore,
    private courseService: CourseService,
    private router: Router) {

  }

  ngOnInit() {
    this.courseId = this.afs.createId();
  }

  onCreateCourse() {
    const val = this.form.value;

    const newCourse: Partial<Course> = {
      description: val.description,
      url: val.url,
      longDescription: val.longDescription,
      promo: val.promo,
      categories: [val.category]
    }
    newCourse.promoStartAt = Timestamp.fromDate(this.form.value.promoStartAt);

    this.courseService.createCourse(newCourse, this.courseId)
      .pipe(
        tap(course => {
          console.log(course);
          this.router.navigateByUrl('/course')
        }),
        catchError(err => {
          alert("Can't create a course");
          return throwError(err);
        })
      )
      .subscribe()

  }

}
