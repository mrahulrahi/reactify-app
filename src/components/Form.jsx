const Form = () => {

  return (
    <form className="w-full">
        <div className="from-row-group flex flex-col">
            <div className="form-group">
                <div className="form-label">Name</div>
                <input type="text" className="form-control" />
            </div>
            <div className="form-group">
                <div className="form-label">Distance</div>
                <input type="number" className="form-control" />
            </div>
        </div>
    </form>
  )
}

export default Form