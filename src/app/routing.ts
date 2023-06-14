import { Router, Request, Response } from 'express'
import fs from 'fs'

import { postProjectPush, postProjectCron } from './modules/project/controller'

import multer from 'multer'
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    if (req.url.includes('cron')) {
      cb(null, file.originalname)
      return 
    }

    cb(null, 'push.js')
    return
  },
  destination: function (req, _file, cb) {
    if (!fs.existsSync(`scripts/${req.params.project_id}`)){
        fs.mkdirSync(`scripts/${req.params.project_id}`);
    }

    if (req.url.includes('cron')) {
      if (!fs.existsSync(`scripts/${req.params.project_id}/cron`)){
          fs.mkdirSync(`scripts/${req.params.project_id}/cron`);
      }

      cb(null, `scripts/${req.params.project_id}/cron`)
      return
    }

    cb(null, `scripts/${req.params.project_id}`)
    return
  },
})
const upload = multer({ storage })

const router: Router = Router()

router.get('/health', (_req, res) => { res.status(200).send('OK') })
router.options('/project/*', (_req, res) => { res.status(200).send() })
router.options('/script/*',  (_req, res) => { res.status(200).send() })

// Project checker
router.post('/project/:project_id/cron/:cron_name', postProjectCron)
router.post('/project/:project_id/push', postProjectPush)

// Upload scripts
router.post('/script/:project_id/cron', upload.single('file'), (_req, res) => { console.log('ok'); res.status(200).send() })
router.post('/script/:project_id/push', upload.single('file'), (_req, res) => { console.log('ok'); res.status(200).send() })

router.get('/script/form', (_req: Request, res: Response): Response<Document> => {
  return res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Formular</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>

    <h1>Script push</h1>
    <form action="/script/2/push" method="post" enctype="multipart/form-data">
      <label for="file">File</label>
      <input type="file" name="file" id="file" />
      <br>
      <input type="submit" value="Send" />
    </form>

    <h1>Script cron</h1>
    <form action="/script/2/cron" method="post" enctype="multipart/form-data">
      <label for="file">File</label>
      <input type="file" name="file" id="file" />
      <br>
      <input type="submit" value="Send" />
    </form>

  </body>
</html>
`)
})

export default router
