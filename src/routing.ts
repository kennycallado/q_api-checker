import { Router } from 'express'

// import { getProject, getProjectCron, getProjectPush, getProjects, postProjectCron, postProjectPush } from './modules/project/controller'
import { /*postProjectCron,*/ postProjectPush } from './modules/project/controller'


const router: Router = Router()

// router.get('/project', getProjects)
// router.get('/project/:id', getProject)

// router.get('/project/:id/cron', getProjectCron)
// router.get('/project/:id/push', getProjectPush)

// router.post('/project/:id/cron', postProjectCron)
router.post('/project/:id/push', postProjectPush)

export default router
