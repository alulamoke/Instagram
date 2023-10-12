export const PageLoading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <img
        src="./favicon.ico"
        alt="Instagram logo"
        className="shrink-0 object-cover"
      />
      <p className="text-sm font-medium">Loading...</p>
    </div>
  );
};
