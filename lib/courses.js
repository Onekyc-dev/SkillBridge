import { vaCourse } from "./course-va";
import { dataEntryCourse } from "./course-data-entry";
import { writingCourse } from "./course-writing";
import { serviceCourse } from "./course-customer-service";
import { extraCourses } from "./course-new";
export const courses = [vaCourse, dataEntryCourse, writingCourse, serviceCourse, ...extraCourses];
