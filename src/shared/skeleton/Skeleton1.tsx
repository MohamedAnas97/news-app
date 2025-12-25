export default function Skeleton1() {
  return (
    <div className="px-4 lg:px-16 py-10">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="animate-pulse bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md overflow-hidden">
            {/* image skeleton  */}
            <div className="h-48 bg-gray-300 dark:bg-gray-600 w-full"></div>
            {/* text skeleton */}
            <div className="p-4 flex flex-col gap-3">
              <div className="h-5 bg-gray-300 dark:bg-gray-600 w-3/4 rounded-lg"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 w-full rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 w-5/6 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 w-2/3 rounded"></div>
              {/* auther skeleton */}
              <div className="flex items-center gap-2 mt-2">
                <div className="h-4 w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="h-4 w-20 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
