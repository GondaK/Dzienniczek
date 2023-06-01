import express from 'express'
import getStatus from './status/get.status'
import postUser from './user/post.user'
import postStudent from './student/post.student'
import getLoginUser from './user/login.user'
import postTeacher from './teacher/post.teacher'
import deleteStudent from './student/delete.student'
import deleteTeacher from './teacher/delete.teacher'
import postClass from './class/post.class'
import putSetClass from './student/put.set-class'
import updateStudent from './student/update.student'
import putClass from './class/put.class'
import updateTeacher from './teacher/update.teacher'
import getClass from './class/get.class'
import deleteClass from './class/delete.class'
import putSubject from './subject/put.subject'
import postSubject from './subject/post.subject'
import getSubject from './subject/get.subject'
import deleteSubject from './subject/delete.subject'
import postGrade from './grade/post.grade'
import putGrade from './grade/put.grade'
import deleteGrade from './grade/delete.grade'
import getSearchTeacher from './teacher/get.search-teacher'
import getStudent from './student/get.student'

const router = express.Router()
// home page route
router.get('/', (req, res) => {
    res.send('Example home page')
})
const apiRoutes = [
    getStatus,
    postUser,
    getLoginUser,
    postStudent,
    postTeacher,
    deleteStudent,
    deleteTeacher,
    postClass,
    putSetClass,
    updateStudent,
    putClass,
    updateTeacher,
    getClass,
    deleteClass,
    putSubject,
    postSubject,
    getSubject,
    deleteSubject,
    postGrade,
    putGrade,
    deleteGrade,
    getSearchTeacher,
    getStudent,
]
apiRoutes.forEach((route) =>
    router[route.method](route.path, route.validators, route.handler),
)

export default router
