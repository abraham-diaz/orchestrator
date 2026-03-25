import 'dotenv/config';

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  calendarApiUrl: process.env.CALENDAR_API_URL || 'http://localhost:3000',
  todoApiUrl: process.env.TODO_API_URL || 'http://localhost:3001',
};
