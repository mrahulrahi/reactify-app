const NeighborhoodLandingPage = () => {
    const categories = [
        { name: "Restaurants" },
        { name: "Coffee Shops" },
        { name: "Hotels" },
        { name: "Garages" },
        { name: "Poutine" },
        { name: "Micro Brasseries" },
        { name: "Pizza" },
        { name: "Tour Guides" },
        { name: "Bachelors" },
        { name: "Tattoo Artists" },
    ]

    return (
        <>
            <div className="py-10 lg:py-20">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="w-full">
                        <div className="mb-8 lg:mb-10">
                            <h1 className="text-4xl font-extrabold leading-10 tracking-tight text-gray-900 text-center sm:leading-none sm:text-5xl md:text-6xl lg:text-7xl">
                                <span>LaCite •</span> <span className="text-transparent bg-clip-text bg-gradient-to-br from-green-500 to-green-400">Limoilou</span>
                            </h1>
                        </div>

                        <div className="w-full aspect-[2/1] bg-gray-50 rounded-lg overflow-hidden">
                            <img src="/nlp-img.jpg" class="w-full h-full object-cover" alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-10 lg:py-20 bg-gray-100">
                <div className="container max-w-7xl mx-auto px-4">
                    <div className="w-full">
                        <div className="w-[calc(100%+16px)] flex flex-wrap -ml-2 -mb-10">
                            {categories.map((category) => (
                                <div
                                    key={category.name}
                                    className="min-[384px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 group px-2 mb-10"
                                >
                                    <a href={`#${category.name.toLowerCase().replace(" ", "-")}`} className="w-full group">
                                        <div className="flex aspect-[3/2] mb-2 bg-white rounded-lg shadow-md overflow-hidden">
                                            <img src={`https://placehold.co/600x400?text=Image`} class="w-full h-full object-cover group-hover:scale-105  transition-all duration-200 ease-in" alt={category.name} />
                                        </div>
                                        <h5 className="text-base sm:text-lg md:text-xl font-semibold px-1">{category.name}</h5>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NeighborhoodLandingPage

