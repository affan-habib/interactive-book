import React from 'react'
import Loading from '../../components/Loading';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';

const ScriptModalContent = ({ data }) => {
  const {id} = useParams()
  const { data: scriptDetails, isLoading, isError } = useFetch({
    queryKey: `scriptDetailsContent`, endPoint: `script-details/${data.id}`, params: {
      item_id:id,
      item_type: "Course"
    }
  });
  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div>
      <iframe src={`http://api-saas.bacbonx.com/uploads/${scriptDetails.data.raw_url}`} style={{ width: '100%', height: '800px' }}></iframe>
    </div>
  )
}

export default ScriptModalContent