import { useQuery, gql } from "@apollo/client";

export const DailyReportPage = () => {
  const meQuery = gql`
    query MeQuery {
      me {
        id
      }
    }
  `;

  const {data} = useQuery(meQuery);
  console.log(data)
  return null;
}