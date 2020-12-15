import { Button, makeStyles, TextField } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import React, { ChangeEvent } from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 0 1rem 1rem",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#f8f8f8",
      "& .MuiButtonBase-root": {
        opacity: 1,
      },
    },
  },
  textarea: {
    background: "#FFF",
  },
  removeButton: {
    opacity: 0,
    color: "#d62d2d",
    padding: 0,
    "&:hover": {
      background: "transparent",
    },
  },
  removeIcon: {
    fontSize: "1rem",
  },
});

interface SpecialOccurenceProps {
  id: string;
  text?: string | null;
  onEdit: (id: string, description: string) => void;
  onRemove: (id: string) => void;
}

const SpecialOccurence: React.FC<SpecialOccurenceProps> = ({
  id,
  text,
  onEdit,
  onRemove,
}) => {
  const classNames = useStyles();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onEdit(id, e.target.value);
  };

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <div className={classNames.root}>
      <TextField
        multiline
        fullWidth
        onChange={handleChange}
        defaultValue={text}
        variant="outlined"
        className={classNames.textarea}
      />
      <Button
        className={classNames.removeButton}
        variant="text"
        disableElevation
        disableRipple
        onClick={handleRemove}
      >
        <CancelIcon className={classNames.removeIcon} />
      </Button>
    </div>
  );
};

export default React.memo(SpecialOccurence);
