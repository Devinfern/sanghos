
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface LocationInputProps {
  location: string;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDetect: () => void;
}

const LocationInput = ({
  location,
  isLoading,
  onChange,
  onDetect
}: LocationInputProps) => {
  return (
    <div className="bg-sage-50/50 p-3 rounded-lg border border-sage-200/30 space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
        <label htmlFor="location" className="text-sm font-medium text-sage-600">
          Location
        </label>
        <div className="flex items-center gap-2 flex-grow sm:max-w-xs">
          <input
            type="text"
            id="location"
            value={location}
            onChange={onChange}
            placeholder="Enter location"
            className="px-2 py-1 text-xs border rounded-md flex-grow text-sage-700 bg-white/50 border-sage-200"
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onDetect}
            disabled={isLoading}
            className="border-sage-200 text-sage-600 hover:bg-sage-50/30 text-xs"
          >
            {isLoading ? <Spinner className="h-3 w-3" /> : "Detect"}
          </Button>
        </div>
      </div>
      <p className="text-[10px] text-sage-500 opacity-70">
        Optional: Help us find local wellness events near you
      </p>
    </div>
  );
};

export default LocationInput;
