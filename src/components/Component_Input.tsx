import React, { ChangeEvent } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import DatePicker from "react-datepicker";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import iconCalendar from "../css/img/icon_calendar.svg";
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  Select,
  Divider,
  Button,
  Tab,
  Tabs,
  Typography,
  Grid,
  MenuItem,
  InputAdornment,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Autocomplete,
  TextField,
  Chip,
  Stack,
} from "@mui/material";
import moment from "moment";

export interface InputProps {
  showIconRequired?: boolean;
  errorValidate?: boolean;
  helperText?: string;
  name: string;
  title: string;
  value: any;
  onInputChangeValue: Function;
  handleValidate?: Function;
  errorTextState?: boolean;
  handleValidateText?: Function;
  numberic?: boolean;
}

export interface InputNumberProps {
  showIconRequired?: boolean;
  errorValidate?: boolean;
  errorTextState?: boolean;
  name: string;
  helperText?: string;
  title: string;
  value: any;
  onInputChangeValue: Function;
  handleValidateText?: Function;
  handleValidate?: Function;
}

export interface SelectProps {
  showIconRequired?: boolean;
  errorValidate?: boolean;
  errorTextState?: boolean;
  helperText?: string;
  name: string;
  title: string;
  value: any;
  listOptions: any;
  onInputChangeValue: Function;
  handleValidate?: Function;
  handleValidateText?: Function;
  defaultRender: string;
}

export interface DateSelectProps {
  handleSelectDatePicker: Function;
  name: string;
  startDate: any;
  setStartDate: Function;
  isErr?: boolean;
  setIsErr?: any;
}

export function InputLayout({
  showIconRequired,
  errorValidate,
  helperText,
  title,
  name,
  value,
  onInputChangeValue,
  handleValidate,
  errorTextState,
  handleValidateText,
  numberic,
}: InputProps) {
  const [error, setError] = React.useState(errorValidate);
  const [errorText, setErrorText] = React.useState(errorTextState);
  const handleInputChangeValue = (name: string, value: string) => {
    if (numberic) {
      const numericValue = value.replace(/[^0-9]/g, "");
      onInputChangeValue(name, numericValue);
    } else onInputChangeValue(name, value);
  };

  React.useEffect(() => {
    handleValidate && handleValidate(name, error);
    handleValidateText && handleValidateText(name, errorText);
  }, [error, errorText]);

  return (
    <Grid className="grid-items" item xs={6}>
      <Typography>
        {title}
        {showIconRequired && <IconRequired />}
      </Typography>
      <FormControl sx={{ width: "30ch" }}>
        <OutlinedInput
          name={name}
          className={error ? "input-value-style-err" : "input-value-style"}
          value={value}
          onChange={(e) => {
            handleInputChangeValue(e.target.name, e.target.value);
          }}
        />
        {helperText && (
          <MyFormHelperText
            message={helperText}
            error={error}
            setError={setError}
            errorText={errorText}
            setErrorText={setErrorText}
          />
        )}
      </FormControl>
    </Grid>
  );
}

export function DateSelect({
  handleSelectDatePicker,
  name,
  startDate,
  setStartDate,
  isErr,
  setIsErr,
}: DateSelectProps) {
  const [isValue, setIsValue] = React.useState(true);
  const isFirstRender = React.useRef(true);
  const handleSelectDate = (date: Date | null) => {
    setStartDate(date);
    setIsValue && setIsValue(true);
    const dateString = moment(date).format("YYYY-MM-DD");
    handleSelectDatePicker(name, dateString);
  };
  const handleBlurDate = () => {
    if (!startDate) {
      setIsValue && setIsValue(false);
      setIsErr && setIsErr(false);
    } else {
      setIsValue && setIsValue(true);
      setIsErr && setIsErr(true);
    }
  };

  React.useEffect(() => {
    if (!isFirstRender.current) {
      // Bỏ qua lần kiểm tra đầu tiên
      if (!startDate) {
        setIsValue && setIsValue(false);
      } else {
        setIsValue && setIsValue(true);
      }
    } else {
      isFirstRender.current = false; // Đánh dấu lần render đầu tiên
    }
    if (!startDate) {
      setIsErr && setIsErr(false);
    } else {
      setIsErr && setIsErr(true);
    }
  }, [startDate]);

  return (
    <FormControl sx={{ width: name === "dob" ? "30ch" : " 25ch" }}>
      <DatePicker
        onBlur={handleBlurDate}
        selected={startDate}
        onChange={(date) => handleSelectDate(date)}
        showYearDropdown
        isClearable
        dateFormat="yyyy/MM/dd"
        scrollableYearDropdown
        className={`date-picker ${isValue ? "" : "err-date "} ${
          name === "dob" ? "" : "date-contact"
        }`}
      />
      <img className="iconCalendar" src={iconCalendar} alt="" />
      <ArrowDropDownIcon className="ArrowDropDownIcon" />
    </FormControl>
  );
}

export function SelectLayout({
  showIconRequired,
  errorValidate,
  helperText,
  title,
  name,
  value,
  onInputChangeValue,
  listOptions,
  handleValidate,
  errorTextState,
  handleValidateText,
  defaultRender,
}: SelectProps) {
  const [error, setError] = React.useState(errorValidate);
  const [errorText, setErrorText] = React.useState(errorTextState);
  const handleInputChangeValue = (name: string, value: any) => {
    onInputChangeValue(name, value);
  };
  React.useEffect(() => {
    handleValidate && handleValidate(name, error);
    handleValidateText && handleValidateText(name, errorText);
  }, [error, errorText]);
  return (
    <>
      <Typography>
        {title}
        {showIconRequired && <IconRequired />}
      </Typography>
      <FormControl
        sx={{
          width:
            name === "type"
              ? "25ch"
              : name === "gender" || name === "marriage_id"
              ? "30ch"
              : "35ch",
        }}
      >
        <Select
          name={name}
          className={error ? "input-value-style-err" : "input-value-style"}
          value={value}
          displayEmpty
          onChange={(e: any) =>
            handleInputChangeValue(e.target.name, e.target.value)
          }
          renderValue={() => {
            const selectedOption = listOptions.find(
              (option: any) => option.value === value && option.value !== ""
            );

            return selectedOption ? (
              <span>{selectedOption.label}</span>
            ) : (
              <span className="text-choose-gender">{defaultRender}</span>
            );
          }}
        >
          {listOptions.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && (
          <MyFormHelperText
            message={helperText}
            error={error}
            setError={setError}
            errorText={errorText}
            setErrorText={setErrorText}
          />
        )}
      </FormControl>
    </>
  );
}

export function InputNumberLayout({
  showIconRequired,
  helperText,
  title,
  errorValidate,
  name,
  value,
  onInputChangeValue,
  handleValidate,
  errorTextState,
  handleValidateText,
}: InputNumberProps) {
  const [error, setError] = React.useState(errorValidate);
  const [errorText, setErrorText] = React.useState(errorTextState);
  const handleInputChangeValue = (name: string, value: any) => {
    onInputChangeValue(name, value);
  };

  React.useEffect(() => {
    handleValidate && handleValidate(name, error);
    handleValidateText && handleValidateText(name, errorText);
  }, [error, errorText]);
  return (
    <>
      <Typography>
        {title}
        {showIconRequired && <IconRequired />}
      </Typography>
      <FormControl sx={{ width: "35ch" }}>
        <OutlinedInput
          name={name}
          className={error ? "input-value-style-err" : "input-value-style"}
          onChange={(e) =>
            handleInputChangeValue(e.target.name, e.target.value)
          }
          type="number"
          defaultValue={value}
          startAdornment={
            <InputAdornment position="start">
              <IconButton sx={{ paddingRight: "0 !important" }} disabled>
                <Typography className="icon_Rp">Rp</Typography>
              </IconButton>
            </InputAdornment>
          }
        />
        {helperText && (
          <MyFormHelperText
            message={helperText}
            error={error}
            setError={setError}
            value={value}
            errorText={errorText}
            setErrorText={setErrorText}
          />
        )}
      </FormControl>
    </>
  );
}

export function MyFormHelperText({
  message,
  error,
  setError,
  value,
  errorText,
  setErrorText,
}: {
  message?: string;
  error?: boolean;
  setError?: Function;
  value?: any;
  errorText?: boolean;
  setErrorText?: Function;
}) {
  const [isFocused, setFocused] = React.useState(false);
  const { focused, filled } = useFormControl() || {};

  React.useEffect(() => {
    if (!filled || value < 0) {
      setErrorText && setErrorText(true);
    } else {
      setErrorText && setErrorText(false);
    }
    if (focused) {
      setFocused(true);
    }

    if ((errorText && isFocused) || value < 0) {
      setError && setError(true);
    } else if (filled) {
      setError && setError(false);
    }
  }, [filled, focused, errorText, value]);

  return (
    <FormHelperText error>
      {error && (value < 0 ? "Please input value min is 0" : message)}
    </FormHelperText>
  );
}

export const IconRequired = () => {
  return <span style={{ color: "red" }}>*</span>;
};
