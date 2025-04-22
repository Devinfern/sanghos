
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

export type DateFilterOption = 
  | 'all' 
  | 'today' 
  | 'tomorrow' 
  | 'this-weekend' 
  | 'this-week' 
  | 'custom';

interface DateFilterProps {
  selectedOption: DateFilterOption;
  customDate: Date | undefined;
  onSelectOption: (option: DateFilterOption) => void;
  onSelectCustomDate: (date: Date | undefined) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  selectedOption,
  customDate,
  onSelectOption,
  onSelectCustomDate
}) => {
  const options: Array<{id: DateFilterOption; label: string}> = [
    { id: 'all', label: 'All Dates' },
    { id: 'today', label: 'Today' },
    { id: 'tomorrow', label: 'Tomorrow' },
    { id: 'this-weekend', label: 'This Weekend' },
    { id: 'this-week', label: 'This Week' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {options.map(option => (
        <Button
          key={option.id}
          variant={selectedOption === option.id ? "default" : "outline"}
          onClick={() => onSelectOption(option.id)}
          className={selectedOption === option.id 
            ? "bg-sand-500 text-white hover:bg-sand-600" 
            : ""}
        >
          {option.label}
        </Button>
      ))}

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={selectedOption === 'custom' ? "default" : "outline"}
            className={`${selectedOption === 'custom' 
              ? "bg-sand-500 text-white hover:bg-sand-600" 
              : ""} flex items-center gap-2`}
          >
            <CalendarIcon className="h-4 w-4" />
            {selectedOption === 'custom' && customDate
              ? format(customDate, "MMM d, yyyy")
              : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={customDate}
            onSelect={(date) => {
              onSelectCustomDate(date);
              if (date) onSelectOption('custom');
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateFilter;
