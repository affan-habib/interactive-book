import React from 'react';
import Loading from '../../components/Loading';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

const VideoModalContent = ({ data }) => {
  const { id } = useParams();
  const { data: videoDetails, isLoading, isError } = useFetch({
    queryKey: `videoDetailsContent`, 
    endPoint: `video-details/${data.id}`, 
    params: {
      item_id: id,
      item_type: "Course"
    }
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="">
      <ReactPlayer 
        url={videoDetails.data.s3_url} 
        controls 
        width="100%" 
        height="100%" 
      />
    </div>
  );
};

export default VideoModalContent;
