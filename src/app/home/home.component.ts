import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CourseService } from '../services/course.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courses$: Observable<Course[]>;

  beginnersCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private router: Router, private db: AngularFirestore, private courseService: CourseService) {

  }

  ngOnInit() {
    this.loadResource();
  }

  loadResource() {
    this.beginnersCourses$ = this.courseService.loadCourseByCategories('BEGINNER');
    this.advancedCourses$ = this.courseService.loadCourseByCategories('ADVANCED');
  }
}
