import FilterButton from '../components/filter-button/FilterButton';
import SortButton from '../components/sort-button/SortButton';
import TrundlerCard from '../components/trundlerCard/TrundlerCard';

const TrundlersPage = () => {
  return (
    <>
      <div className="content-container">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 mx-auto">
              <div className="heading d-flex align-items-center justify-content-between">
                <h5>Trundlers</h5>
                <div className="heading-right ps-3 flex-shrink-0">
                  <div className="filter-sort-btn-box d-flex">
                    <div className="fs-btn"><FilterButton /></div>
                    <div className="fs-btn"><SortButton /></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-10 mx-auto">
              <div className="row g-4">
                <div className="col-lg-4 col-md-6">
                  <TrundlerCard />

                </div>
                <div className="col-lg-4 col-md-6">
                  <TrundlerCard />

                </div>
                <div className="col-lg-4 col-md-6">
                  <TrundlerCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrundlersPage