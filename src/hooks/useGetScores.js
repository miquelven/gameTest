import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

const getScore = async (userEmail) => {
  let scores = "";

  const response = await axios("/api/scores", {
    params: { email: userEmail },
  });

  console.log(response);

  scores = response.data.userScores.sort((a, b) => b - a);
  scores = scores.slice(0, 10);

  console.log(scores);

  return scores;
};

const useGetScore = (userEmail) => {
  return useQuery({
    queryKey: ["score-data"],
    queryFn: () => getScore(userEmail),
  });
};

export default useGetScore;
