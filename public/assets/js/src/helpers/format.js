import { getStaticDate } from "./datetime.js"

export const formatAdminModules = (modules) => {
    let formated = '', count = 1;

    modules.forEach(_module => {
        formated += `
            <ul class="table__body__row table__body__row--module" data-moduleid="${_module.id}">
                <li class="table__body__row__item">${count}</li>
                <li class="table__body__row__item">${_module.name}</li>
                <li class="table__body__row__item">${_module.code}</li>
                <li class="table__body__row__item">${getStaticDate(_module.added_on)}</li>
                <li class="table__body__row__item">
                    <svg class="table__body__row__item__edit image--icon">
                        <use href="#pencil"></use>
                    </svg>
                    <svg class="table__body__row__item__delete image--icon">
                        <use href="#trash"></use>
                    </svg>
                </li>
            </ul>
        `;

        count++
    });

    return formated;
}

export const formatAdminLecturers = (lecturers) => {
    let formated = '', count = 1;

    lecturers.forEach(lecturer => {
        formated += `
            <ul class="table__body__row table__body__row--lecturer" data-lecturerid="${lecturer.id}">
                <li class="table__body__row__item">${count}</li>
                <li class="table__body__row__item">${lecturer.lastname}</li>
                <li class="table__body__row__item">${lecturer.initials}</li>
                <li class="table__body__row__item">${lecturer.staff_no}</li>
                <li class="table__body__row__item">${getStaticDate(lecturer.added_on)}</li>
                <li class="table__body__row__item">
                    <svg class="table__body__row__item__edit image--icon">
                        <use href="#pencil"></use>
                    </svg>
                    <svg class="table__body__row__item__delete image--icon">
                        <use href="#trash"></use>
                    </svg>
                </li>
            </ul>
        `

        count++
    });

    return formated;
}

export const formatLecturerStudents = (students) => {
    let formated = '', count = 1;

    students.forEach(student => {
        formated += `
            <ul class="table__body__row table__body__row--student" data-studentid="${student.id}">
                <li class="table__body__row__item">${count++}</li>
                <li class="table__body__row__item">${student.lastname}</li>
                <li class="table__body__row__item">${student.initials}</li>
                <li class="table__body__row__item">${student.student_no}</li>
            </ul>
        `
    });

    return formated;
}

export const formatAdminStudents = (students) => {
    let formated = '', count = 1;

    students.forEach(student => {
        formated += `
            <ul class="table__body__row table__body__row--student" data-studentid="${student.id}">
                <li class="table__body__row__item">${count}</li>
                <li class="table__body__row__item">${student.lastname}</li>
                <li class="table__body__row__item">${student.initials}</li>
                <li class="table__body__row__item">${student.student_no}</li>
                <li class="table__body__row__item">${getStaticDate(student.added_on)}</li>
                <li class="table__body__row__item">
                    <svg class="table__body__row__item__edit image--icon">
                        <use href="#pencil"></use>
                    </svg>
                    <svg class="table__body__row__item__delete image--icon">
                        <use href="#trash"></use>
                    </svg>
                </li>
            </ul>
        `

        count++
    });

    return formated;
}

export const formatLecturerAttendanceTrackers = (attendanceTrackers) => {
    let formated = '', count = 1;

    attendanceTrackers.forEach(attendanceTracker => {
        formated += `
            <ul class="table__body__row">
                <li class="table__body__row__item table__body__row--attendanceTracker"data-attendancetrackerid="${attendanceTracker.id}" data-attendancetrackermoduleid="${attendanceTracker.module_id}">${count}</li>
                <li class="table__body__row__item table__body__row--attendanceTracker"data-attendancetrackerid="${attendanceTracker.id}" data-attendancetrackermoduleid="${attendanceTracker.module_id}">${attendanceTracker.name}</li>
                <li class="table__body__row__item table__body__row--attendanceTracker"data-attendancetrackerid="${attendanceTracker.id}" data-attendancetrackermoduleid="${attendanceTracker.module_id}">${attendanceTracker.attendance_count}</li>
                <li class="table__body__row__item table__body__row--attendanceTracker"data-attendancetrackerid="${attendanceTracker.id}" data-attendancetrackermoduleid="${attendanceTracker.module_id}">${getStaticDate(attendanceTracker.start_period)}</li>
                <li class="table__body__row__item table__body__row--attendanceTracker"data-attendancetrackerid="${attendanceTracker.id}" data-attendancetrackermoduleid="${attendanceTracker.module_id}">${getStaticDate(attendanceTracker.end_period)}</li>
                <li class="table__body__row__item table__body__row--attendanceTracker"data-attendancetrackerid="${attendanceTracker.id}" data-attendancetrackermoduleid="${attendanceTracker.module_id}">${attendanceTracker.status}</li>
                <li class="table__body__row__item">
                    <svg class="table__body__row__item__students image--icon"data-attendancetrackerid="${attendanceTracker.id}" data-attendancetrackermoduleid="${attendanceTracker.module_id}">
                        <use href="#users"></use>
                    </svg>
                    <svg class="table__body__row__item__edit image--icon"data-attendancetrackerid="${attendanceTracker.id}" data-attendancetrackermoduleid="${attendanceTracker.module_id}">
                        <use href="#pencil"></use>
                    </svg>
                    <svg class="table__body__row__item__delete image--icon"data-attendancetrackerid="${attendanceTracker.id}" data-attendancetrackermoduleid="${attendanceTracker.module_id}">
                        <use href="#trash"></use>
                    </svg>
                </li>
            </ul>
        `

        count++
    });

    return formated;
}

export const formatStudentAttendanceTrackers = (attendanceTrackers) => {
    let formated = '', count = 1;

    attendanceTrackers.forEach(attendanceTracker => {
        formated += `
            <ul class="table__body__row table__body__row--attendanceTracker" data-attendancetrackerid="${attendanceTracker.id}">
                <li class="table__body__row__item">${count}</li>
                <li class="table__body__row__item">${attendanceTracker.name}</li>
                <li class="table__body__row__item">${getStaticDate(attendanceTracker.start_period)}</li>
                <li class="table__body__row__item">${getStaticDate(attendanceTracker.end_period)}</li>
                <li class="table__body__row__item">Register</li>
            </ul>
        `

        count++
    });

    return formated;
}

export const formatAdminAttendanceTrackers = (attendanceTrackers) => {
    let formated = '', count = 1;

    attendanceTrackers.forEach(attendanceTracker => {
        formated += `
            <ul class="table__body__row">
                <li class="table__body__row__item">${count}</li>
                <li class="table__body__row__item">${attendanceTracker.lastname}</li>
                <li class="table__body__row__item">${attendanceTracker.initials}</li>
                <li class="table__body__row__item">${attendanceTracker.name}</li>
                <li class="table__body__row__item">${getStaticDate(attendanceTracker.start_period)}</li>
                <li class="table__body__row__item">${getStaticDate(attendanceTracker.end_period)}</li>
            </ul>
        `

        count++
    });

    return formated;
}

export const formatStudentAttendanceHistory = (attendances) => {
    let formated = '', count = 1;

    attendances.forEach(attendance => {
        formated += `
            <ul class="table__body__row">
                <li class="table__body__row__item">${count++}</li>
                <li class="table__body__row__item">${attendance.name}</li>
                <li class="table__body__row__item">${attendance.pc_no}</li>
                <li class="table__body__row__item">${getStaticDate(attendance.start_period)}</li>
                <li class="table__body__row__item">${getStaticDate(attendance.end_period)}</li>
            </ul>
        `
    });

    return formated;
}

export const formatStudentAttendanceCardTrackers = (attendanceTrackers) => {
    let formated = '', count = 1;

    attendanceTrackers.forEach(attendanceTracker => {
        formated += `
            <div class="container__main__focus__cards__item card table__body__row--attendanceTracker"  data-attendancetrackerid="${attendanceTracker.id}">
                <div class="card__header card__header--no-border">
                    <div class="card__header__left">
                        <h1>${attendanceTracker.name}</h1>
                    </div>
                </div>
                <div class="card__body">
                    <p>Ends: ${getStaticDate(attendanceTracker.end_period)}</p>
                </div>
                <div class="card__footer">
                    <p>Register</p>
                </div>
            </div>
        `

        count++
    });

    return formated;
}

export const formatAttendanceCards = (attendances) => {
    let formated = '', count = 1;

    attendances.forEach(attendance => {
        formated += `
            <div class="container__main__focus__cards__item card">
                <div class="card__header card__header--no-border">
                    <div class="card__header__left">
                        <h1>${attendance.name}</h1>
                    </div>
                </div>
                <div class="card__body">
                    <p>Attended on: ${getStaticDate(attendance.end_period)}</p>
                </div>
                <div class="card__footer">
                    <p>PC No: ${attendance.pc_no}</p>
                </div>
            </div>
        `

        count++
    });

    return formated;
}

export const formatSelect = (modules) => {
    let formated = '<option value="select">Select</option>';

    let temp = [], dic = {}

    modules.forEach(_module => {
        dic[_module.name] = _module.id
        temp.push(_module.name)
    })

    temp.sort().forEach(_module => {
        formated += `<option value="${dic[_module]}">${_module}</option>`;
    });

    return formated;
}