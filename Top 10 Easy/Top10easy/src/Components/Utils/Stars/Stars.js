export default function Stars({totalStars}) {

  const allStars = () => {
    let filledStars = [...Array(Math.floor(totalStars)).keys()].map((i, idx) => {
      return <svg key={idx} className="mx-1 w-4 h-4 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
    });
    if (Math.floor(totalStars) < 5) {
      if (Math.ceil(totalStars) - totalStars <= .5) {
        filledStars.push(<svg key="last-star" className="mx-1 w-4 h-4 fill-current text-yellow-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>)
      }
      else {
        filledStars.push(<svg key="last-star" className="mx-1 w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>)
      }
    }
    return filledStars
  }

  return <div className="flex justify-center items-center">
    <div className="flex items-center my-3">
      {allStars()}
    </div>
  </div>
}