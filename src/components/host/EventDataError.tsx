
interface EventDataErrorProps {
  error: string | null;
}

const EventDataError = ({ error }: EventDataErrorProps) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600 text-sm">
      <p className="font-medium mb-1">Error extracting data:</p>
      <p>{error}</p>
      <p className="mt-2 text-xs">Please check the URL and try again, or ensure the event data is accessible.</p>
    </div>
  );
};

export default EventDataError;
