import './MyOrders.css'
import InnerHero from "../../components/inner-hero/InnerHero"
import DownloadInVice from "../../components/download-inv/DownloadInVice"
import moment from 'moment'


const MyOrderPage = ({ session, ordersList }) => {

  return (
    <>
      <InnerHero midHeading="My Orders" />
      <div className="content-container position-relative pt-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 mx-auto">
              <div className="custom-table">
                <div className="table-responsive">
                  {ordersList?.length > 0 ?
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Date of purchase</th>
                          <th scope="col">Itinerary Name</th>
                          <th scope="col">Trundler Info</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Invoice</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ordersList?.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td>{moment(data?.created_at).format("DD-MM-YYYY")}</td>
                              <td>{data?.itinerary_name}</td>
                              <td>{data?.trundler_info}</td>
                              <td>${parseInt(data?.amount)}</td>
                              <td>
                                <DownloadInVice token={session?.user?.access_token} orderId={data?.id} />
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table> :
                    <table className='table'>
                      <p className='p-5 text-center'>
                        No records found.
                      </p>
                    </table>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyOrderPage