
const Form = () => {


  return (
    <form>
        <div className="from-row-group">
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