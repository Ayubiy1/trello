import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router";

const ListsComp = () => {
  const params = useParams();
  console.log(params?.key);

  const { data } = useQuery("lists", () => {
    return axios.get(`https://trello-api-ahgs.onrender.com/boards`);
  });

  return <>Lists</>;
};

export default ListsComp;
