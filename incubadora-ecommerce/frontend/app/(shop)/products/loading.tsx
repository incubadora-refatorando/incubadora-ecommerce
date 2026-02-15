export default function Loading() {
	return (
		<div className="container mx-auto px-4 py-8">
			{/* Header Skeleton */}
			<div className="mb-8">
				<div className="h-10 w-64 bg-gray-light rounded animate-pulse mb-2" />
				<div className="h-6 w-32 bg-gray-light rounded animate-pulse" />
			</div>

			{/* Product Grid Skeleton */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
				{[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
					<div key={i} className="h-96 bg-gray-light rounded-lg animate-pulse" />
				))}
			</div>
		</div>
	);
}
