import * as React from "react";
import { FormControl, useFormControlContext } from "@mui/base/FormControl";
import { Input, inputClasses } from "@mui/base/Input";
import { styled } from "@mui/system";
import clsx from "clsx";
import { useState } from "react";
import { axiosPrivate } from "../api/axios";
import { Button } from "@mui/base/Button";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Cast_Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Date: "",
    Melt_No: "",
    Size: "",
    Grade: "",
    Dendrite_Arm_Spacing: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    console.log(localStorage.getItem("accessToken"));
    axiosPrivate
      .post("/sheet", { data: formData, sheet: "Cast" })
      .then((res) => {
        if (res.status === 200) {
          alert("Data added successfully");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex justify-center items-center bg-gray-900 min-h-screen">
      <div className="flex p-5 shadow-xl rounded-xl w-96 gap-3 mx-auto items-center bg-gray-300">
        <form onSubmit={handleSubmit}>
          <FormControl
            defaultValue=""
            required
            value={formData.Date}
            onChange={handleChange}
            className="m-1"
          >
            <Label>Date</Label>
            <StyledInput type="date" placeholder="Select a date" name="Date" />
            <HelperText />
          </FormControl>
          <FormControl
            defaultValue=""
            required
            value={formData.Melt_No}
            onChange={handleChange}
            className="m-1"
          >
            <Label>Melt No</Label>
            <StyledInput placeholder="Enter the milt value" name="Melt_No" />
            <HelperText />
          </FormControl>
          <FormControl
            defaultValue=""
            required
            value={formData.Size}
            onChange={handleChange}
            className="m-1"
          >
            <Label>Size</Label>
            <select
              name="Size"
              onChange={handleChange}
              className="border-2 m-1
          "
            >
              <option value="">Select an option</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>

            <HelperText />
          </FormControl>

          <FormControl
            defaultValue=""
            required
            value={formData.Grade}
            onChange={handleChange}
            className="m-1"
          >
            <Label>Grade</Label>
            <StyledInput placeholder="Enter the Grade value" name="Grade" />
            <HelperText />
          </FormControl>

          <FormControl
            defaultValue=""
            required
            value={formData.Dendrite_Arm_Spacing}
            onChange={handleChange}
            className="m-1"
          >
            <Label>Dendrite Arm Spacing</Label>
            <StyledInput
              placeholder="Enter the Dendrite Arm Spacing value"
              name="Dendrite_Arm_Spacing"
            />
            <HelperText />
          </FormControl>

          <Button
            onClick={handleSubmit}
            className="flex btn justify-center mx-auto rounded-xl mt-5"
            style={{
              backgroundColor: "#1f883d",
              padding: "8px",
              marginTop: "10px",
              color: "white",
              cursor: "pointer",
            }}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

const StyledInput = styled(Input)(
  ({ theme }) => `

  .${inputClasses.input} {
    width: 320px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: ${blue[400]};
    }

    &:focus {
      outline: 0;
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
    }
  }
`
);

const Label = styled(({ children, className }) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return <p>{children}</p>;
  }

  const { error, required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return (
    <p className={clsx(className, error || showRequiredError ? "invalid" : "")}>
      {children}
      {required ? " *" : ""}
    </p>
  );
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  margin-bottom: 4px;

  &.invalid {
    color: red;
  }
`;

const HelperText = styled((props) => {
  const formControlContext = useFormControlContext();
  const [dirty, setDirty] = React.useState(false);

  React.useEffect(() => {
    if (formControlContext?.filled) {
      setDirty(true);
    }
  }, [formControlContext]);

  if (formControlContext === undefined) {
    return null;
  }

  const { required, filled } = formControlContext;
  const showRequiredError = dirty && required && !filled;

  return showRequiredError ? <p {...props}>This field is required.</p> : null;
})`
  font-family: "IBM Plex Sans", sans-serif;
  font-size: 0.875rem;
  color: red;
`;

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};
