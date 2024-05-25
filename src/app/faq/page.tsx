import Layout from "../components/layout/UserLayout";

const Faq = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-5 my-5 lg:my-12">
        <h2 className="uppercase text-4xl font-black mb-10 text-center w-full text-jsPrimary100">
          Frequently asked questions
        </h2>

        <div className="p-5 border shadow-md flex flex-col gap-5 text-jsBlack">
          <details className="w-full">
            <summary className="cursor-pointer p-4">
              What time can I check-in and check-out?
            </summary>
            <div className="p-4 bg-gray-50">
              <p>
                Executive Business Suite check-in time is at 2 PM and check-out at 12 PM. Kindly
                note that check-in time may be shifted to 3:00 PM during high
                occupancy periods.{" "}
              </p>
            </div>
          </details>
          <details className="w-full">
            <summary className="cursor-pointer p-4">Do you have wifi?</summary>
            <div className="p-4 bg-gray-50">
              <p>
                High speed wireless internet is offered for free throughout the
                hotel; whether it be rooms, poolside, terrace, communal areas or
                breakfast area.
              </p>
            </div>
          </details>
          <details className="w-full">
            <summary className="cursor-pointer p-4">
              Can I bring my pet inside the hotel?
            </summary>
            <div className="p-4 bg-gray-50">
              <p>
                As much as we love pets, unfortunately, we are unable to
                accommodate them in our rooms or any of our common areas. We can
                refer you to the local pet house, while you choose to stay with
                us.
              </p>
            </div>
          </details>
          <details className="w-full">
            <summary className="cursor-pointer p-4">
              What payment methods are accepted?
            </summary>
            <div className="p-4 bg-gray-50">
              <p>We accept cash and all major credit cards as payment.</p>
            </div>
          </details>
          <details className="w-full">
            <summary className="cursor-pointer p-4">
              What is included in our rooms?
            </summary>
            <div className="p-4 bg-gray-50">
              <p>
                Our rooms include a vast array of utilities to make your stay
                enjoyable.
              </p>
            </div>
          </details>
          <details className="w-full">
            <summary className="cursor-pointer p-4">
              Do you charge any fees for your services?
            </summary>
            <div className="p-4 bg-gray-50">
              <p>
                No, A-HOTEL.com doesn&apos;t charge any fees for its services.
                Our service is completely free of charge and we will not add to
                your accommodation any additional fee for our service.
              </p>
            </div>
          </details>
          <details className="w-full">
            <summary className="cursor-pointer p-4">
              Are the rates on your web site per person or per room?
            </summary>
            <div className="p-4 bg-gray-50">
              <p>The price is always per room.</p>
            </div>
          </details>
          <details className="w-full">
            <summary className="cursor-pointer p-4">
              How many rooms can I book at once?
            </summary>
            <div className="p-4 bg-gray-50">
              <p>
                You can book as many rooms as are available for selected period.
              </p>
            </div>
          </details>
          <details className="w-full">
            <summary className="cursor-pointer p-4">
              Is it secure to send my credit card details?
            </summary>
            <div className="p-4 bg-gray-50">
              <p>
                Yes, it is absolutely secure as we are using encrypted SSL
                protocol in all our order forms. This is the latest, most secure
                technology that encrypts all the details provided in the order
                form including your credit card details. All our servers are
                also protected by firewall against any unauthorized access.{" "}
              </p>
            </div>
          </details>
        </div>
      </div>
    </Layout>
  );
};

export default Faq;
