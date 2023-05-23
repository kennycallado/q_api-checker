import { Action, Answer, Paper, PostPaper} from "./types";
import { IUser } from "./interfaces";

// Clase más por legibilidad que por funcionalidad
// para therapist es más fácil entender que se hacer
// con un User que con un PostPaper
export class User implements IUser {
  readonly id;
  readonly record;
  readonly answers: Answer[];
  readonly actions: Action[];
  readonly paper: Paper;
  // project_keys; // needed ??

  constructor(paper: PostPaper) {
    // this.project_keys = paper.project_keys;
    this.id = paper.user_id;
    this.record = paper.user_record;
    this.answers = paper.answers;
    this.actions = [];
    this.paper = {
      id: paper.id,
      user_id: paper.user_id,
      project_id: paper.project_id,
      resource_id: paper.resource_id,
      completed: paper.completed,
    };
  }

  add_resource(...resource_ids: number[]) {
    if (typeof resource_ids[0] !== "number") {
      resource_ids = resource_ids[0];
    }

    this.actions.push({ action: "add_resource", params: resource_ids })
    return
  }

  resource_complete(...resource_ids: number[]) {
    if (resource_ids.length === 0 || resource_ids.find((id) => id === this.paper.resource_id)) {
      this.paper.completed = true;
      return
    }

    this.actions.push({ action: "resource_complete", params: resource_ids })
    return
  }

  // get actions() { return this.actions; }
}
