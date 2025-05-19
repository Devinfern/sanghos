
interface EventDataErrorProps {
  error: string;
}

const EventDataError = ({ error }: EventDataErrorProps) => {
  if (!error) return null;
  
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
      <p className="text-sm">{error}</p>
    </div>
  );
};

export default EventDataError;
