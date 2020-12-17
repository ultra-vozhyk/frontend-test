import React, { FC } from "react";
import { OrderDirection } from "../api/getSpecialOccurrences";
import SpecialOccurence from "./SpecialOccurence";
import {
  Box,
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ErrorIcon from "@material-ui/icons/Error";
import { useManageOccurrencies } from "../hooks/useManageOccurrencies";

type DailyReportPageProps = {
  projectId: string;
  date: string;
};

const useStyles = makeStyles({
  wrapper: {
    padding: "3rem 5rem",
  },
  header: {
    display: "flex",
    padding: "1rem 0",
    marginBottom: "1rem",
    justifyContent: "space-between",
    alignItems: "center",
  },
  empty: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "2rem",
    "& svg": {
      marginRight: "0.5rem",
    },
  },
});

const DailyReportPage: FC<DailyReportPageProps> = ({ projectId, date }) => {
  const classNames = useStyles();

  const {
    data,
    create: handleCreate,
    deferredUpdate: handleUpdate,
    remove: handleRemove,
  } = useManageOccurrencies(date, projectId, OrderDirection["desc"]);

  const renderForm = () => (
    <form noValidate autoComplete="off">
      {data.map((obj) => (
        <SpecialOccurence
          key={obj.id}
          id={obj.id}
          text={obj.description}
          onEdit={handleUpdate}
          onRemove={handleRemove}
        />
      ))}
    </form>
  );

  const renderEmpty = () => (
    <p className={classNames.empty}>
      <ErrorIcon fontSize="small" color="error" /> No data yet
    </p>
  );

  return (
    <Container maxWidth="lg">
      <Paper className={classNames.wrapper} elevation={8}>
        <Box
          border={1}
          borderTop={0}
          borderRight={0}
          borderLeft={0}
          borderColor="grey.300"
          className={classNames.header}
        >
          <Typography variant="h5" component="h1">
            Special Occurrencies
          </Typography>
          <Button
            data-testid="add-occurrence-btn"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleCreate}
          >
            create
          </Button>
        </Box>
        {data.length ? renderForm() : renderEmpty()}
      </Paper>
    </Container>
  );
};

export default DailyReportPage;
