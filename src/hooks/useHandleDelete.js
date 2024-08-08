import api from '@/server/api';

const handleDelete = async (id, endpoint, queryClient,queryKey) => {
    try {
      const response = await api.delete(`/${endpoint}/${id}`);
      if (response?.status === 200) {
        queryClient.invalidateQueries(queryKey);
      }
    } catch (error) {
      // Handle errors if needed
      console.error(`Error deleting ${endpoint} with ID ${id}:`, error);
    }
};

export default handleDelete;