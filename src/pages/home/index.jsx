import React from "react";
import Testimonial from "./Testimonial";
// import CallToAction from "./CallToAction";
import Courses from "./Courses";
import HeroSection from "./HeroSection";
import Experts from "./Experts";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/Loading";

const Home = () => {
  const { data: orgDetails, isLoading, isError } = useFetch({ queryKey: 'orgDetails', endPoint: 'organization-details' });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching data</div>;
  return (
    <div>
      <div className="container mx-auto">
        <HeroSection />
        <Courses />
      </div>
      <Experts data={orgDetails.data.featured_mentors} />
      <div>
        <Testimonial />
        {/* <CallToAction /> */}
      </div>
    </div>
  );
};

export default Home;
