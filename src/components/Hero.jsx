/* eslint-disable react/prop-types */

const Hero = ({title, subTitle, gradientColor1, gradientColor2 }) => {
    return (
        <>
            <div className={`min-h-[400px] bg-gradient-to-r from-${gradientColor1} to-${gradientColor2} flex flex-col items-center justify-center !pt-20`}>
                <main className="w-10/12 flex flex-col">
                    <h4 className="!mb-2">{subTitle}</h4>
                    <h1 className="!mb-0">{title}</h1>
                </main>
            </div>
        </>
    )
}

export default Hero