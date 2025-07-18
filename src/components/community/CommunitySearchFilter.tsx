
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CommunitySearchFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
}

const CommunitySearchFilter = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange
}: CommunitySearchFilterProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-10 rounded-full border-brand-subtle/30 focus:border-brand-primary transition-colors"
            placeholder="Search discussions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full md:w-48">
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger className="rounded-full border-brand-subtle/30 focus:border-brand-primary hover:border-brand-primary transition-colors">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="bg-white border-brand-subtle/20 shadow-md rounded-lg">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="question">Questions</SelectItem>
            <SelectItem value="discussion">Discussions</SelectItem>
            <SelectItem value="resource">Resources</SelectItem>
            <SelectItem value="event">Events</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CommunitySearchFilter;
