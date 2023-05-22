import { Action, Answer, Paper, PostPaper} from "./types";

// Clase más por legibilidad que por funcionalidad
// para therapist es más fácil entender que se hacer
// con un User que con un PostPaper
export class User {
  actions: Action[] = [];

  // project_keys; // needed ??
  id;
  record;
  answers: Answer[];
  paper: Paper;

  constructor(paper: PostPaper) {
    // this.project_keys = paper.project_keys;
    this.id = paper.user_id;
    this.record = paper.user_record;
    this.answers = paper.answers;
    this.paper = {
      id: paper.id,
      user_id: paper.user_id,
      project_id: paper.project_id,
      resource_id: paper.resource_id,
      completed: paper.completed,
    };
  }

  add_resource(...resource_ids: number[]) {
    if (resource_ids.length === 0) {
      return
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
