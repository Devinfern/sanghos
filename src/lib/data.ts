
// This file now serves as a compatibility layer for existing imports
// All functionality has been moved to smaller, focused files in the data/ directory

export type { Instructor, Location, Retreat } from './data/index';
export { 
  instructors, 
  fetchSanghosRetreats, 
  retreats, 
  formatCurrency, 
  formatDate, 
  getRemainingText 
} from './data/index';
