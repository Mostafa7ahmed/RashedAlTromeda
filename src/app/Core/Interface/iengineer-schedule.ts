export interface IEngineerSchedule {
  id: number;
  engineerId: number;
  dayOfWeek: number;
  date: string;        // ISO string مثل "2025-10-31T00:00:00Z"
  startTime: string;   // "HH:mm:ss"
  endTime: string;     // "HH:mm:ss"
  isHoliday: boolean;
}