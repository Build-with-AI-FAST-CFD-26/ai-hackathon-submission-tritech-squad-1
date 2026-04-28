export enum ConflictType {
  PRIORITY = "priority",
  TIMELINE = "timeline",
  COMMITMENT = "commitment",
  COMMUNICATION = "communication",
}

export interface Conflict {
  type: ConflictType;
  description: string;
  evidence: string;
  impact: string;
}

export interface Risk {
  category: string;
  description: string;
  severity: "Low" | "Medium" | "High";
}

export interface Action {
  task: string;
  rationale: string;
}

export interface MessageSuggestion {
  recipient: string;
  context: string;
  draft: string;
}

export interface CognitiveAnalysis {
  summary: string;
  decisions: string[];
  conflicts: Conflict[];
  risks: Risk[];
  contextGaps: string[];
  suggestedActions: Action[];
  suggestedMessages: MessageSuggestion[];
}
