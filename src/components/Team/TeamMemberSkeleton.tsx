const TeamMemberSkeleton = () => {
  return (
    <div className="bg-background animate-pulse rounded-lg p-4 shadow-lg">
      <div className="bg-muted relative mb-4 h-64 w-full rounded-lg"></div>
      <div className="space-y-3">
        <div className="h-4 w-3/4 rounded bg-gray-300"></div>
        <div className="h-3 w-1/2 rounded bg-gray-300"></div>
        <div className="h-3 w-2/3 rounded bg-gray-300"></div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-8 rounded bg-gray-300"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberSkeleton;
