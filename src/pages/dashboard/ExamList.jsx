import React from 'react';
import { Icon } from "@iconify/react";
import useFetch from "@/hooks/useFetch";
import moment from 'moment';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';

const ExamList = () => {
  const navigate = useNavigate();
  const { data: examList, isLoading, isError } = useFetch({ queryKey: 'examList', endPoint: 'student-quiz-participated-list' });

  if (isLoading) return <Loading/>;
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
                <button onClick={() => navigate(`/exam-details/${exam.id}`)} className="text-blue-500">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExamList;    