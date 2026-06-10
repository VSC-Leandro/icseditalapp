export interface TimelineEvent {
  id: string;
  label: string;
  date: string;
  status: 'past' | 'current' | 'future';
  details?: string;
  highlight?: boolean;
}

export interface EligibilityState {
  organizationType: string;
  state: string;
  communityTypes: string[];
  hasCnpj: boolean;
  climateImpacts: string[];
  climateImpactDetail: string;
}

export interface BudgetItem {
  id: string;
  category: string;
  description: string;
  value: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  stage: 1 | 2;
  required: boolean;
  tip?: string;
}

export interface Message {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}
