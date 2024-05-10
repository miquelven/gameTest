import { useQuery } from "@tanstack/vue-query";

import axios from "axios";

const getTopScore = async () => {
  const data = await axios("/api/top-scores");

  const newData = data.data.topScores.map((item) => ({
    ...item,
    name: item.name.charAt(0).toUpperCase() + string.slice(1),
  }));

  return data;
};

const useGetTopScore = () => {
  return useQuery({
    queryKey: ["topscore-data"],
    queryFn: () => getTopScore(),
  });
};

export default useGetTopScore;
