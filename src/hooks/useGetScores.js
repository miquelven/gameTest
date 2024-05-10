import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

const getScore = async () => {
  let scores = "";

  const userEmail = this.$store.state.user
    ? this.$store.state.user.email
    : null;
  const response = await axios("/api/scores", {
    params: { email: userEmail },
  });

  scores = response.data.userScores.sort((a, b) => b - a);
  scores = this.scores.slice(0, 10);

  return scores;
};

const useGetScore = () => {
  return useQuery({
    queryKey: ["score-data"],
    queryFn: () => getScore(),
  });
};

export default useGetScore;
