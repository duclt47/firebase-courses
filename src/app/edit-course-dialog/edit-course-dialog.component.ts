import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Course } from "../model/course";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { CourseService } from '../services/course.service';


@Component({
    selector: 'edit-course-dialog',
    templateUrl: './edit-course-dialog.component.html',
    styleUrls: ['./edit-course-dialog.component.css']
})
export class EditCourseDialogComponent {
    form: FormGroup;
    course: Course;
    constructor(
        private modalDialog: MatDialogRef<EditCourseDialogComponent>,
        private fb: FormBuilder,
        private courseService: CourseService,
        @Inject(MAT_DIALOG_DATA) course: Course) {
        this.course = course
        this.form = this.fb.group({
            description: [course.description, Validators.required],
            longDescription: [course.description, Validators.required],
            promo: [false],
        });
    }

    close() {
        this.modalDialog.close()
    }
    save() {
        const changes = this.form.value;
        this.courseService.updateCourse(this.course.id, changes).subscribe(() => {
            this.modalDialog.close(changes);
        })
    }
}






