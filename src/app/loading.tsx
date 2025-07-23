export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="w-8 h-8 border-4 border-black border-dashed rounded-full animate-spin"></div>
      <p className="mt-4 text-black">Loading content, Please wait...</p>
    </div>
  );
}
