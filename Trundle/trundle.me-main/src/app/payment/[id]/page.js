import "../PaymentPage.css";
import { IoClose } from "react-icons/io5";
import PaymentContainer from "../PaymentContainer";
import Price from "../price/Price"
import { getAnItinerary } from "../../lib/itinerary/getItinerary";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/authOptions";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Loading } from "../../components/loading/Loading";
const PaymentPage = async ({ params }) => {
  const session = await getServerSession(authOptions);

  const access_token = session?.user?.access_token;

  const itinerary_id = params?.id;

  const itinerary = await getAnItinerary({ access_token, itinerary_id });

  const purchaseStatus = itinerary?.purchase_status

  if (purchaseStatus === 1) {
    redirect(`/traveller/itinerary/${itinerary_id}`)
  }

  return (
    <Suspense fallback={<Loading />} className="container">
      <div className="content-container position-relative">
        <div className="container">
          <div className="row">
            <div className="col-xl-10 mx-auto">
              <div className="row">
                <div className="col-lg-8">
                  <div
                    className="accordion accordion-card-box"
                    id="accordionExample"
                  >
                    <div className="acb-item">
                      <div
                        className="acb-head collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        <h3 className="acb-title">
                          Credit/Debit Card
                        </h3>
                        <div className="acb-close">
                          <IoClose />
                        </div>
                      </div>
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="acb-body">
                          <div className="payment-gateway">
                            <PaymentContainer />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Price />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default PaymentPage;
