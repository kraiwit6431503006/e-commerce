export default function SkeletonCard() {
  return (
    <div className="border rounded-lg bg-white p-4 animate-pulse">
      <div className="h-40 bg-gray-200 rounded mb-4" />
      <div className="h-4 bg-gray-200 rounded mb-2" />
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
      <div className="h-8 bg-gray-200 rounded" />
    </div>
  )
}