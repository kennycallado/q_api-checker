import { Action, PubNewAnswer, Paper, PubPaperPush} from "./types"
import { IUser } from "./interfaces"

export class User implements IUser {
  readonly id
  readonly record
  readonly answers: PubNewAnswer[]
  readonly actions: Action[]
  readonly paper: Paper

  constructor(paper: PubPaperPush) {
    this.id = paper.user_id
    this.record = paper.user_record
    this.answers = paper.answers
    this.actions = []
    this.paper = {
      id: paper.id,
      user_id: paper.user_id,
      project_id: paper.project_id,
      resource_id: paper.resource_id,
      completed: paper.completed,
    }
  }

  send_message(message_id: number) {
    this.actions.push({ action: "send_message", params: [message_id] })
    return
  }

  add_resource(...resource_ids: number[]) {
    if (typeof resource_ids[0] !== "number") {
      resource_ids = resource_ids[0]
    }

    this.actions.push({ action: "add_resource", params: resource_ids })
    return
  }

  resource_complete(...resource_ids: number[]) {
    if (resource_ids.length === 0 || resource_ids.find((id) => id === this.paper.resource_id)) {
      this.paper.completed = true
      return
    }

    this.actions.push({ action: "resource_complete", params: resource_ids })
    return
  }
}