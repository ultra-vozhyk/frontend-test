import React, { FC } from 'react';
import { useQuery } from "@apollo/client";
import { DailyReportSpecialOccurrencesQuery, DailyReportSpecialOccurrencesQueryVariables, getSpecialOccurrences } from './api/getSpecialOccurrences';
import JSONTree from 'react-json-tree'

type DailyReportPageProps = {
  projectId: string;
  date: string;
}

export const DailyReportPage: FC<DailyReportPageProps> = ({ projectId, date }) => {
  const { data } = useQuery<DailyReportSpecialOccurrencesQuery, DailyReportSpecialOccurrencesQueryVariables>(getSpecialOccurrences, {
    variables: {
      input: {
        projectId,
        date
      }
    }
  });

  return (
    <div>
      <h1>{date}</h1>
      <div>
        <h2>Special occurances</h2>
        <div>
          <JSONTree data={data} hideRoot/>
        </div>
      </div>
    </div>
  );
}