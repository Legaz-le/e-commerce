export default function BasketLoading() {
  return (
    <div className="bg-brand-light">
      <div className="container mx-auto py-10">
        <div className="space-y-10">
          <h1 className="heading-1">Your shopping cart</h1>
          <div className="flex flex-col w-full space-y-5 animate-pulse">
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 w-full">
              <div className="h-6 bg-gray-200 rounded w-24" />
              <div className="h-6 bg-gray-200 rounded w-20 mx-auto" />
              <div className="h-6 bg-gray-200 rounded w-16 ml-auto" />
            </div>
            <div className="border-b border-gray-200" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-48" />
                    <div className="h-4 bg-gray-200 rounded w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
