import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, throwError } from 'rxjs';
import { Course } from '../model/course';
import { catchError, concatMap, map } from 'rxjs/operators';
import { convertSnaps } from './db-utils';
import { Lesson } from '../model/lesson';
import firebase from 'firebase';
import OrderByDirection = firebase.firestore.OrderByDirection;

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private db: AngularFirestore) { }

  findLessons(courseId: string, sortOrder: OrderByDirection = 'asc', pageNumber = 0, pageSize = 3): Observable<Lesson[]> {
    return this.db.collection(`courses/${courseId}/lessons`,
      ref => ref.orderBy('seqNo', sortOrder)
        .limit(pageSize)
        .startAfter(pageSize * pageNumber))
      .get()
      .pipe(map(results => convertSnaps<Lesson>(results)))
  }

  findCourseByUrl(courseUrl: string) {
    return this.db.collection('courses', ref => ref.where('url', '==', courseUrl))
      .get()
      .pipe(
        map(results => {
          const courses = convertSnaps<Course>(results);
          return courses.length == 1 ? courses[0] : null;
        }),
        catchError(err => {
          alert(err);
          return throwError(err);
        })
      )
  }

  deleteCourseAndLessons(courseId: string) {

    this.db.collection(`courses/${courseId}/lessons`)
      .get()
      .pipe(
        concatMap(results => {
          const lessons = convertSnaps<Lesson>(results);
          const batch = this.db.firestore.batch();
          const courseRef = this.db.doc(`courses/${courseId}`).ref;
          batch.delete(courseRef);

          for (const lesson of lessons) {
            const lessonRef = this.db.doc(`courses/${courseId}/lessons/${lesson.id}`).ref;
            batch.delete(lessonRef)
          }

          return from(batch.commit())
        })
      )
  }

  deleteCourse(courseId: string): Observable<any> {
    return from(this.db.doc(`courses/${courseId}`).delete());
  }

  updateCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    return from(this.db.doc(`courses/${courseId}`).update(changes));
  }

  createCourse(newCourse: Partial<Course>, courseId?: string) {
    return this.db.collection("course", ref => ref.orderBy("seqNo", "desc").limit(1))
      .get()
      .pipe(concatMap(results => {
        const courses = convertSnaps<Course>(results);
        const lastCourseSeqNo = courses[0]?.seqNo ?? 0;
        const course = {
          ...newCourse,
          seqNo: lastCourseSeqNo + 1
        }
        let $save: Observable<any>;

        if (courseId) {
          $save = from(this.db.doc(`courses/${courseId}`).set(newCourse));
        } else {
          $save = from(this.db.collection(`courses}`).add(newCourse));
        }

        return $save.pipe(map(res => {
          return {
            id: courseId ?? res.id,
            ...course
          }
        }))
      }))
  }

  loadCourseByCategories(category: string): Observable<Course[]> {
    return this.db.collection('courses', ref =>
      ref.where('categories', 'array-contains', category).orderBy('seqNo')).get()
      .pipe(map(results => {
        return convertSnaps<Course>(results);
      }))
  }
}
