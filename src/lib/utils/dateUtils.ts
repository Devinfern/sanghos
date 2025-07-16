import { isAfter, startOfDay, parseISO, isValid } from 'date-fns';

/**
 * Filters out past retreats based on their date
 * @param retreats Array of retreat objects
 * @param currentDate Current date (defaults to today)
 * @returns Array of future retreats only
 */
export const filterPastRetreats = <T extends { date: string }>(
  retreats: T[], 
  currentDate: Date = new Date()
): T[] => {
  const today = startOfDay(currentDate);
  
  return retreats.filter(retreat => {
    try {
      const retreatDate = parseISO(retreat.date);
      
      // Ensure the parsed date is valid
      if (!isValid(retreatDate)) {
        console.warn(`Invalid date format for retreat: ${retreat.date}`);
        return false;
      }
      
      // Include retreats that are today or in the future
      return isAfter(retreatDate, today) || startOfDay(retreatDate).getTime() === today.getTime();
    } catch (error) {
      console.error(`Error parsing date for retreat: ${retreat.date}`, error);
      return false;
    }
  });
};

/**
 * Filters out past events based on their startDate
 * @param events Array of event objects (startDate can be Date or string)
 * @param currentDate Current date (defaults to today)
 * @returns Array of future events only
 */
export const filterPastEvents = <T extends { startDate: string | Date }>(
  events: T[], 
  currentDate: Date = new Date()
): T[] => {
  const today = startOfDay(currentDate);
  
  return events.filter(event => {
    try {
      // Handle both Date and string types for startDate
      const eventDate = event.startDate instanceof Date 
        ? event.startDate 
        : parseISO(event.startDate);
      
      // Ensure the parsed date is valid
      if (!isValid(eventDate)) {
        console.warn(`Invalid date format for event: ${event.startDate}`);
        return false;
      }
      
      // Include events that are today or in the future
      return isAfter(eventDate, today) || startOfDay(eventDate).getTime() === today.getTime();
    } catch (error) {
      console.error(`Error parsing date for event: ${event.startDate}`, error);
      return false;
    }
  });
};