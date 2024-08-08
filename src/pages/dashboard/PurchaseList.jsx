import React from 'react';
import { Icon } from "@iconify/react";
import useFetch from "@/hooks/useFetch";
import moment from 'moment';
const PurchaseList = () => {
  const { data: examList, isLoading, isError } = useFetch({ queryKey: 'examList', endPoint: 'http://api-saas.bacbonx.com/api/website/student-purchase-list' });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="overflow-x-auto"> 
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Exam Title</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Date of Participation</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Score</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Action</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Category</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Price</th>
          </tr>
        </thead>
        <tbody>
          {examList.data.map(exam => (
            <tr key={exam.id}>
              <td className="py-4 px-4 border-b border-gray-200">{exam.title}</td>
              <td className="py-4 px-4 border-b border-gray-200">{moment(exam.created_at).format('MMMM Do YYYY')}</td>
              <td className="py-4 px-4 border-b border-gray-200">{exam.mark}</td>
              <td className="py-4 px-4 border-b border-gray-200">{exam.submission_status}</td>
              <td className="py-4 px-4 border-b border-gray-200">
                <button className="text-blue-500">Details</button>
              </td>
              <td className="py-4 px-4 border-b border-gray-200">{exam.category_name}</td>
              <td className="py-4 px-4 border-b border-gray-200">{'₹' + exam.sale_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PurchaseList;      