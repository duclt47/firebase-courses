import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Lesson } from '../model/lesson';
import { CourseService } from '../services/course.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  loading = false;
  course: Course;
  lessons: Lesson[];

  displayedColumns = ['seqNo', 'description', 'duration'];
  lastPageLoaded;

  constructor(private route: ActivatedRoute,
    private courseService: CourseService) {

  }

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    this.loading = true;
    this.courseService.findLessons(this.course.id)
      .pipe(finalize(() => {
        this.loading = false
      }))
      .subscribe(results => {
        this.lessons = results;
      })
  }

  loadMore() {
    this.lastPageLoaded++;
    this.loading = true;
    this.courseService.findLessons(this.course.id, 'asc', this.lastPageLoaded)
      .pipe(finalize(() => {
        this.loading = false
      }))
      .subscribe(results => {
        this.lessons = this.lessons.concat(results)
      })
  }



}
