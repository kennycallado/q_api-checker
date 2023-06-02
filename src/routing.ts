import { Router } from 'express'

import { postProjectPush, postProjectCron } from './modules/project/controller'

const router: Router = Router()

router.get('/health', (_req, res) => { res.status(200).send('OK') })
router.options('/project/*', (_req, res) => { res.status(200).send() })

router.post('/project/:project_id/cron/:cron_name', postProjectCron)
router.post('/project/:project_id/push', postProjectPush)

export default router
