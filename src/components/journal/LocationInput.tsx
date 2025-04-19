
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
    <div className="bg-sage-50 p-4 rounded-lg border border-sage-200/50 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
        <label htmlFor="location" className="text-sm font-medium text-sage-700">
          Your Location
        </label>
        <div className="flex items-center gap-2 flex-grow sm:max-w-xs">
          <input
            type="text"
            id="location"
            value={location}
            onChange={onChange}
            placeholder="Enter your location"
            className="px-3 py-1 text-sm border rounded-md flex-grow"
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onDetect}
            disabled={isLoading}
            className="border-sage-300 text-sage-700 hover:bg-sage-50"
          >
            {isLoading ? <Spinner className="h-4 w-4" /> : "Detect"}
          </Button>
        </div>
      </div>
      <p className="text-xs text-sage-500">
        We'll use your location to find relevant wellness events near you
      </p>
    </div>
  );
};

export default LocationInput;
