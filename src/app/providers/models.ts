import { Action, Paper, PubPaperPush} from "./types"
import { IUser } from "./interfaces"

export class User implements IUser {
  readonly id
  record: Record<string, number|string>[]
  readonly actions: Action[]
  readonly paper: Paper

  constructor(paper: PubPaperPush) {
    this.id = paper.user_id
    this.record = paper.user_record ? paper.user_record : Object.create(null);
    this.actions = []
    this.paper = {
      id: paper.id,
      user_id: paper.user_id,
      project_id: paper.project_id,
      resource_id: paper.resource_id,
      completed: paper.completed,
      answers: paper.answers
    }
  }

  toggle_active() {
    this.actions.push({ action: "toggle_active", params: [] })
    return
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

  resource_completed(...resource_ids: number[]) {
    if (typeof resource_ids[0] !== "number") {
      resource_ids = resource_ids[0]
    }

    if (!resource_ids || resource_ids.length === 0) {
      this.actions.push({ action: "resource_completed", params: [this.paper.resource_id] })
      return
    }

    this.actions.push({ action: "resource_completed", params: resource_ids })
    return
  }
}
