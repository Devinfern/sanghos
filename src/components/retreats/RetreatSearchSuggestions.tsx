
import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Calendar, Tag, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Retreat } from '@/lib/data';

interface Suggestion {
  type: 'location' | 'category' | 'title' | 'instructor';
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface RetreatSearchSuggestionsProps {
  value: string;
  onChange: (value: string) => void;
  retreats: Retreat[];
  placeholder?: string;
  className?: string;
}

const RetreatSearchSuggestions: React.FC<RetreatSearchSuggestionsProps> = ({
  value,
  onChange,
  retreats,
  placeholder = "Search retreats, locations, categories...",
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Generate suggestions based on retreats data
  const generateSuggestions = (query: string): Suggestion[] => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    const suggestions: Suggestion[] = [];
    const seen = new Set<string>();

    // Search in retreat titles
    retreats.forEach(retreat => {
      if (retreat.title.toLowerCase().includes(lowerQuery) && !seen.has(retreat.title)) {
        suggestions.push({
          type: 'title',
          value: retreat.title,
          label: retreat.title,
          icon: <Search className="h-4 w-4" />
        });
        seen.add(retreat.title);
      }
    });

    // Search in locations
    retreats.forEach(retreat => {
      const locationStr = `${retreat.location.city}, ${retreat.location.state}`;
      if (locationStr.toLowerCase().includes(lowerQuery) && !seen.has(locationStr)) {
        suggestions.push({
          type: 'location',
          value: locationStr,
          label: locationStr,
          icon: <MapPin className="h-4 w-4" />
        });
        seen.add(locationStr);
      }
    });

    // Search in categories
    const allCategories = Array.from(new Set(retreats.flatMap(r => r.category)));
    allCategories.forEach(category => {
      if (category.toLowerCase().includes(lowerQuery) && !seen.has(category)) {
        suggestions.push({
          type: 'category',
          value: category,
          label: category,
          icon: <Tag className="h-4 w-4" />
        });
        seen.add(category);
      }
    });

    // Search in instructor names
    retreats.forEach(retreat => {
      if (retreat.instructor?.name.toLowerCase().includes(lowerQuery) && !seen.has(retreat.instructor.name)) {
        suggestions.push({
          type: 'instructor',
          value: retreat.instructor.name,
          label: `Instructor: ${retreat.instructor.name}`,
          icon: <Calendar className="h-4 w-4" />
        });
        seen.add(retreat.instructor.name);
      }
    });

    return suggestions.slice(0, 6); // Limit to 6 suggestions
  };

  useEffect(() => {
    setSuggestions(generateSuggestions(value));
    setSelectedIndex(-1);
  }, [value, retreats]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    onChange(suggestion.value);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const clearSearch = () => {
    onChange('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => value && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="pl-9 pr-10"
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={`${suggestion.type}-${suggestion.value}`}
              onClick={() => handleSuggestionClick(suggestion)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors",
                index === selectedIndex && "bg-sage-50"
              )}
            >
              <div className="text-muted-foreground">
                {suggestion.icon}
              </div>
              <div className="flex-1">
                <span>{suggestion.label}</span>
              </div>
              <div className="text-xs text-muted-foreground capitalize">
                {suggestion.type}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default RetreatSearchSuggestions;
