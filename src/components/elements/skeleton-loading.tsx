export const SkeletonLoading = ({ className }: { className: string }) => {
  return (
    <div
      className={["animate-pulse bg-gray-200 rounded-lg", className].join(" ")}
    ></div>
  );
};
