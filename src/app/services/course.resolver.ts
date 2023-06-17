import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { CourseService } from './course.service';

@Injectable({
    providedIn: 'root'
})
export class CourseResolver implements Resolve<Course>{

    constructor(private courseService: CourseService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        any {
        const courseUrl = route.paramMap.get("courseUrl");
        return this.courseService.findCourseByUrl(courseUrl);
    }

}
