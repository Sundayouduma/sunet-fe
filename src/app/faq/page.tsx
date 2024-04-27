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
                Standard check-in time is at 2 PM and check-out at 12 PM. Kindly
                note that check-in time may be shifted to 3:00 PM during high
                occupancy periods.{" "}
              </p>
            </div>
          </details>
          <details className="w-full">
            <summary className="cursor-pointer p-4">Do you have wifi?</summary>
            <div className="p-4 bg-gray-50">
              <p>
                Stay connected during your stay with 40MB bandwidth internet
                service provided throughout our guestrooms and public areas.
                Please log-in with your username and password provided at
                check-in. User name is your room no. Password is *followed by
                room no. eg: USER NAME: 2803 PASSWORD: *2803.
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
        </div>
      </div>
    </Layout>
  );
};

export default Faq;
