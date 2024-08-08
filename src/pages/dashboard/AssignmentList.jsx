import React from 'react';
import { Icon } from "@iconify/react";
import useFetch from "@/hooks/useFetch";
import Loading from '../../components/Loading';
const AssignmentList = () => {
  const { data: studentCourseList, isLoading, isError } = useFetch({ queryKey: 'studentCourseList', endPoint: 'student-assignment-list' });

  if (isLoading) return <Loading/>;
  if (isError) return <div>Error fetching data</div>;

  return (


    <div className="overflow-x-auto">
      No Data Found
    </div>


  );
}

export default AssignmentList;