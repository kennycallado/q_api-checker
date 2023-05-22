export type User = {
  readonly id: number;
  readonly record: Record<string, number>[];
  readonly answers: Answer[];
  readonly paper: Paper;
  readonly actions: Action[];
}

export type Answer = {
  readonly question_id: number;
  readonly answer: string;
}

export type Paper = {
  readonly id: number;
  readonly user_id: number;
  readonly project_id: number;
  readonly resource_id: number;
  completed: boolean;
}

export type PostPaper = {
  readonly id: number;
  readonly project_id: number;
  // readonly project_keys: string[];
  readonly user_id: number;
  readonly user_record: Record<string, number>[];
  readonly resource_id: number;
  readonly completed: boolean;
  readonly answers: Answer[];
}

export type Action = {
  action: string;
  params: number[];
}
