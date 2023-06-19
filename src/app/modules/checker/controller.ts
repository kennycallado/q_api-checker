import { Request, Response } from 'express'

import { User } from '../../providers/models'
import { getCronProjectScript, getPushProjectScript } from '../../providers/services/scripts'
import { PubPaperPush } from '../../providers/types'

export async function checkerCron(req: Request, res: Response): Promise<Response> {
  /* Validation */
  if (isNaN(parseInt(req.params.project_id))) {
    return res.status(400).json({ error: 'Bad request' })
  }
  const project_id: number = parseInt(req.params.project_id)
  const cron_name: string = req.params.cron_name

  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Bad request' })
  }

  for (let i = 0; i < req.body.length; i++) {
    if (
      req.body[i].id           === undefined ||
      req.body[i].user_id      === undefined ||
      req.body[i].user_record  === undefined ||
      req.body[i].project_id   === undefined ||
      req.body[i].resource_id  === undefined ||
      req.body[i].completed    === undefined ||
      req.body[i].answers      === undefined
    ) {
      return res.status(400).json({ error: 'Bad request' })
    }
  }

  let projectScript = getCronProjectScript(project_id, cron_name)
  if (!projectScript) {
    return res.status(404).json({ error: `Cron script -${cron_name}- for project ${project_id} not found` })
  }
  /* fin Validation */

  let papers: any = []

  for (let i = 0; i < req.body.length; i++) {
    let user: User = Function(
      await import('../../providers/models').then((m) => m.User.toString())
        + `const user = new User(${JSON.stringify(req.body[i])});`
        + `function main() {`
        + projectScript
        + `};`
        + `main(); return user;`
    )()

    papers.push(Object.assign(userToPaperPush(user) , { actions: user.actions }))
  }

  return res.json(papers)
}

export async function checkerPush(req: Request, res: Response): Promise<Response> {
  /* Validation */
  if (isNaN(parseInt(req.params.project_id))) {
    return res.status(400).json({ error: 'Bad request' })
  }
  const project_id: number = parseInt(req.params.project_id)

  if (
    req.body.id           === undefined ||
    req.body.user_id      === undefined ||
    req.body.user_record  === undefined ||
    req.body.project_id   === undefined ||
    req.body.resource_id  === undefined ||
    req.body.completed    === undefined ||
    req.body.answers      === undefined
  ) {
    return res.status(400).json({ error: 'Bad request' })
  }

  let projectScript = getPushProjectScript(project_id)
  if (!projectScript) {
    return res.status(404).json({ error: `Push script for project ${project_id} not found` })
  }
  /* fin Validation */

  let user: User = Function(
    await import('../../providers/models').then((m) => m.User.toString())
      + `const user = new User(${JSON.stringify(req.body)});`
      + `function main() {`
      + projectScript
      + `};`
      + `main(); return user;`
  )()

  return res.json(Object.assign(userToPaperPush(user), { actions: user.actions }))
}

function userToPaperPush(user: User): PubPaperPush {
  return {
    id: user.paper.id,
    user_id: user.paper.user_id,
    user_record: Object.assign(user.record),
    project_id: user.paper.project_id,
    resource_id: user.paper.resource_id,
    completed: user.paper.completed,
    answers: user.answers,
  }
}
