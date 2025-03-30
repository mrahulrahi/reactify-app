export default function NoResultsFound() {
    return (
        <section className="py-20 bg-white">
            <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
                <h2 className="text-2xl tracking-tight text-gray-900 sm:text-4xl md:text-5xl xl:text-6xl">
                    No Results Found.
                </h2>
                <p className="max-w-md mx-auto mt-3 text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    refine your search filters/keywords
                </p>
                <div className="flex justify-center mt-8 space-x-3">
                </div>
            </div>
        </section>
    )
}