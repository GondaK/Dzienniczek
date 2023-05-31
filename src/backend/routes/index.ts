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
]
apiRoutes.forEach((route) =>
    router[route.method](route.path, route.validators, route.handler),
)

export default router
