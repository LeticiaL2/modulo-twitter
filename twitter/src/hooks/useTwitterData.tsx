import { useQuery } from "react-query";
import axios from "axios";

const baseURL = "http://localhost:3000";

const fetchData = async () => {
  const response = await axios.get(baseURL);
  return response?.data;
};

export default function useTwitterData() {
  const query = useQuery({ queryFn: fetchData, queryKey: ["twitter-data"] });

  return query;
}
