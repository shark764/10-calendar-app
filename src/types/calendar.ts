export interface CalEvent {
  id: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: {
    id: string;
    name: string;
  };
}

export interface FormCalEvent {
  title: string;
  notes: string;
  start: Date;
  end: Date;
}

export enum Phase {
  alpha = 'Alpha',
  beta = 'Beta',
}
