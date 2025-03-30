import InnerHero from "../components/inner-hero/InnerHero"
import MidContainer from "../components/mid-container/MidContainer";
import Image from "next/image";

const SuccessPage = () => {
  return (
    <>
      <InnerHero />
      <MidContainer>
        <div className="registration-success-box text-center">
          <div className="rsb-icon">
            <Image
              src="/images/tick-icon.svg"
              width={42}
              height={42}
              alt="Success"
            />
          </div>
          <h3>
            Thank You for reaching out.
          </h3>
          <p className="opacity-60">
            Our team will reach out to you with the next steps about your travel.
          </p>
        </div>
      </MidContainer>
    </>
  );
};

export default SuccessPage;
