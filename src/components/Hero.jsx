/* eslint-disable react/prop-types */

const Hero = ({title, subTitle}) => {
    return (
        <>
            <div className="min-h-[400px] bg-gradient-to-r from-red-400 to-amber-300 flex flex-col items-center justify-center !pt-20">
                <main className="w-10/12 flex flex-col">
                    <h4 className="!mb-2">{subTitle}</h4>
                    <h1 className="!mb-0">{title}</h1>
                </main>
            </div>
        </>
    )
}

export default Hero