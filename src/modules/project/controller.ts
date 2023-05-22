import { Request, Response } from 'express'

import { getPushProjectScript } from '../../services/scripts'

import { User } from '../../providers/models'
import { PostPaper } from '../../providers/types'

// export async function getProjects(_req: Request, res: Response) {
//   res.json({ message: 'index' })
// }

// export async function getProject(req: Request, res: Response) {
//   const id: string = req.params.id
//   res.json({ message: `show project, ${id}!` })
// }

// export async function getProjectCron(req: Request, res: Response) {
//   const id: string = req.params.id
//   res.json({ message: `show cron project, ${id}!` })
// }

// export async function getProjectPush(req: Request, res: Response) {
//   const id: string = req.params.id
//   res.json({ message: `show push project, ${id}!` })
// }

export async function postProjectCron(req: Request, res: Response) {
  const id: string = req.params.id
  res.json({ message: `Hello, ${id}!` })
}

export async function postProjectPush(req: Request, res: Response) {
  /* Pre */
  const project_id: string = req.params.id

  let projectScript = getPushProjectScript(project_id)
  if (!projectScript) {
    return res.status(404).json({ error: `Push script for project ${project_id} not found` })
  }

  if (
    req.body.id           === undefined ||
    req.body.user_id      === undefined ||
    req.body.user_record  === undefined ||
    req.body.project_id   === undefined ||
    // req.body.project_keys === undefined ||
    req.body.resource_id  === undefined ||
    req.body.completed    === undefined ||
    req.body.answers      === undefined
  ) {
    return res.status(400).json({ error: 'Bad request' })
  }

  // let class_user = await import('../../providers/models').then((m) => m)
  // let user = postPaperToUser(req.body)
  
  /* fin Pre */

  let user: User = Function(
    // class_user.User.toString()
    await import('../../providers/models').then((m) => m.User.toString())
    + `const user = new User(${JSON.stringify(req.body)});`
    + projectScript
    + `return main();`
  )();

  /* Post */
  let paper = userToPostPaper(user)
  return res.json({ paper, actions: user.actions })
}

// function postPaperToUser(paper: PostPaper): User {
//   return new User(paper)
// }

function userToPostPaper(user: User): PostPaper {
  return {
    id: user.paper.id,
    user_id: user.paper.user_id,
    user_record: user.record,
    project_id: user.paper.project_id,
    // project_keys: user.paper.project_keys,
    resource_id: user.paper.resource_id,
    completed: user.paper.completed,
    answers: user.answers,
  }
}
