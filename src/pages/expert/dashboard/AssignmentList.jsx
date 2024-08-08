import React , { useState } from 'react';
import { Icon } from "@iconify/react";
import useFetch from "@/hooks/useFetch";
import Modal from "@/components/ui/Modal";
import moment from 'moment';
import CreateAssignment from './CreateAssignment';
const AssignmentList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: assignmentList, isLoading, isError } = useFetch({ queryKey: 'assignmentList', endPoint: 'assignments' });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="overflow-x-auto"> 
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Assignment List</h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Create Assignment
        </button>
      </div>
      {isOpen && (
        <Modal activeModal={isOpen} onClose={() => setIsOpen(false)} className='max-w-xxl' title='Create Assignment'>
          {/* <div className="p-4">
            <h2 className="text-xl font-semibold">Create Assignment</h2>
            <form className="mt-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input type="text" id="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows={4}
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                  Create
                </button>
              </div>
            </form>
          </div> */}
          <CreateAssignment  />
        </Modal>
      )}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Assignment</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Deadline</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="py-4 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">Action</th>
          </tr>
        </thead>
        <tbody>
          {assignmentList.data.map(item => (
            <tr key={item.id}>
              <td className="py-4 px-4 border-b border-gray-200">{item.student_name}</td>
              <td className="py-4 px-4 border-b border-gray-200">{item.course_title}</td>
              <td className="py-4 px-4 border-b border-gray-200">{moment(item.created_at).format('MMMM Do YYYY')}</td>
              <td className="py-4 px-4 border-b border-gray-200">
                <button className="text-blue-500">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentList;      