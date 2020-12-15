import React, { FC, useState } from "react";
import { OrderDirection } from "./api/getSpecialOccurrences";
import SpecialOccurence from "./components/SpecialOccurence";
import { Button, Container, MenuItem, Select } from "@material-ui/core";
import { useManageOccurrencies } from "./hooks/useManageOccurrencies";

type DailyReportPageProps = {
  projectId: string;
  date: string;
};

export const DailyReportPage: FC<DailyReportPageProps> = ({
  projectId,
  date,
}) => {
  const [sort, setSort] = useState<OrderDirection>(OrderDirection["asc"]);
  const {
    data,
    create: handleCreate,
    defferedUpdate: handleUpdate,
    remove: handleRemove,
  } = useManageOccurrencies(date, projectId, sort);

  const handleSortChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSort(e.target.value as OrderDirection);
  };

  return (
    <Container maxWidth="lg">
      <h1>{date}</h1>
      <div>
        <h2>Special occurrencies</h2>
        <Select value={sort} onChange={handleSortChange}>
          <MenuItem value="asc">ASC</MenuItem>
          <MenuItem value="desc">DESC</MenuItem>
        </Select>
        <Button onClick={handleCreate}>create</Button>
        <form noValidate autoComplete="off">
          {data?.result?.items.map((obj) => (
            <SpecialOccurence
              key={obj.id}
              id={obj.id}
              text={obj.description}
              onEdit={handleUpdate}
              onRemove={handleRemove}
            />
          ))}
        </form>
      </div>
    </Container>
  );
};
