import express from 'express'
import getStatus from './status/get.status'
import postUser from './user/post.user'
import postStudent from './student/post.student'
import getLoginUser from './user/login.user'
const router = express.Router()
// home page route
router.get('/', (req, res) => {
    res.send('Example home page')
})
const apiRoutes = [getStatus, postUser, getLoginUser, postStudent]
apiRoutes.forEach((route) =>
    router[route.method](route.path, route.validators, route.handler),
)
export default router
