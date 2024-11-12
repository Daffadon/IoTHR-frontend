export interface ProfileProps {
  fullname: string;
  email: string;
  birthDate: string;
}
export interface HistoryProps {
  topicId: string;
  topicName: string;
  analyzed: boolean;
}

export interface UserHistoryProps {
  topicId: string;
  topicName: string;
  date: string;
  recordTime: string;
  analyzed: boolean;
}
