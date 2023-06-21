export type User = {
  readonly id: number;
  // readonly record: Object;
  readonly record: Record<string, number>[];
  readonly answers: PubNewAnswer[];
  readonly paper: Paper;
  readonly actions: Action[];
}

export type PubNewAnswer = {
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

export type PubPaperPush = {
  readonly id: number;
  readonly user_id: number;
  // readonly user_record: Object;
  readonly user_record: Record<string, number>[];
  readonly project_id: number;
  readonly resource_id: number;
  readonly completed: boolean;
  readonly answers: PubNewAnswer[];
}

export type Action = {
  action: string;
  params: number[];
}
