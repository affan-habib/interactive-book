import { useQuery } from "@tanstack/react-query";
import api from "@/server/api";

const useSingleData = ({ queryKey, endPoint, id, param }) => {
    return useQuery({
        queryKey: [queryKey, [id, param]],
        queryFn: () => {
            if (param) {
                return api
                    .get(`${endPoint}/${param}`, {
                        param,
                    })
                    .then((res) => res.data);
            } else {
                return api.get(endPoint).then((res) => res.data);
            }
        },
    });
};

export default useSingleData;
