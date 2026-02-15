export default function Loading() {
	return (
		<div className="container mx-auto px-4 py-8">
			<div className="max-w-6xl mx-auto">
				{/* Back Button Skeleton */}
				<div className="h-10 w-24 bg-gray-light rounded animate-pulse mb-6" />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Image Skeleton */}
					<div className="aspect-square bg-gray-light rounded-lg animate-pulse" />

					{/* Info Skeleton */}
					<div className="space-y-4">
						<div className="h-10 bg-gray-light rounded animate-pulse" />
						<div className="h-6 bg-gray-light rounded animate-pulse w-1/2" />
						<div className="h-12 bg-gray-light rounded animate-pulse" />
						<div className="h-32 bg-gray-light rounded animate-pulse" />
						<div className="h-16 bg-gray-light rounded animate-pulse" />
						<div className="h-12 bg-gray-light rounded animate-pulse" />
					</div>
				</div>
			</div>
		</div>
	);
}
