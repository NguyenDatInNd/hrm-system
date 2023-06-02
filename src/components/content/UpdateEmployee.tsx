import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/store";
import OutlinedInput from "@mui/material/OutlinedInput";
import DatePicker from "react-datepicker";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import IconWarning from "../../css/img/icon_warning.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import IconUploadFile from "../../css/img/icon_upload_file.svg";
import FormHelperText from "@mui/material/FormHelperText";
import IconNotChecked from "../../css/img/icon_not_checked.svg";
import IconCheckedDisable from "../../css/img/icon_checked_disable.svg";
import iconCalendar from "../../css/img/icon_calendar.svg";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import {
  Box,
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
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import moment from "moment";

interface InputProps {
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
}

function InputLayout({
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
}: InputProps) {
  const [error, setError] = React.useState(errorValidate);
  const [errorText, setErrorText] = React.useState(errorTextState);
  const handleInputChangeValue = (name: string, value: string) => {
    onInputChangeValue(name, value);
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
          sx={{
            marginTop: "8px !important",
            height: 47,
            border: error ? "1px solid rgb(243, 174, 175)" : "inherit",
            backgroundColor: error
              ? "rgb(255, 239, 239)"
              : "rgb(241, 243, 245)",
          }}
          value={value}
          onChange={(e) =>
            handleInputChangeValue(e.target.name, e.target.value)
          }
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

interface SelectProps {
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

function SelectLayout({
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
  const handleInputChangeValue = (name: string, value: string) => {
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
          sx={{
            marginTop: "8px !important",
            height: 47,
            border: error ? "1px solid rgb(243, 174, 175)" : "inherit",
            backgroundColor: error
              ? "rgb(255, 239, 239)"
              : "rgb(241, 243, 245)",
          }}
          value={value}
          displayEmpty
          onChange={(e) =>
            handleInputChangeValue(e.target.name, e.target.value)
          }
          renderValue={(selected) => {
            const selectedOption = listOptions.find(
              (option: any) => option.value === selected && option.value !== ""
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

interface InputNumberProps {
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

function InputNumberLayout({
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
  const handleInputChangeValue = (name: string, value: string) => {
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
          sx={{
            marginTop: "8px !important",
            height: 47,
            border: error ? "1px solid rgb(243, 174, 175)" : "inherit",
            backgroundColor: error
              ? "rgb(255, 239, 239)"
              : "rgb(241, 243, 245)",
          }}
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

function MyFormHelperText({
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

const IconRequired = () => {
  return <span style={{ color: "red" }}>*</span>;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="box-create-employee" sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const UpdateEmployee: React.FC = () => {
  const [valueTab, setValueTab] = React.useState(0);
  const [errorTab, setErrorTab] = React.useState<boolean>(false);
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(null);
  const [contractDate, setContractDate] = React.useState<Date | null>(null);

  const [stateEmployment, setStateEmployment] = React.useState({
    entitledOT: false,
    mealAllowancePaid: false,
    operationalAllowancePaidine: true,
    attendanceAllowancePaid: true,
  });

  const handleChangeCheckBoxEmployment = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.name === "entitledOT") {
      setStateEmployment({
        ...stateEmployment,
        operationalAllowancePaidine: !event.target.checked,
        attendanceAllowancePaid: !event.target.checked,
        [event.target.name]: event.target.checked,
      });
      if (event.target.checked === true) {
        setInputValue({
          ...inputValue,
          entitle_ot: "1",
          operational_allowance_paid: "0",
          attendance_allowance_paid: "0",
        });
      } else
        setInputValue({
          ...inputValue,
          entitle_ot: "0",
          operational_allowance_paid: "1",
          attendance_allowance_paid: "1",
        });
    } else {
      setStateEmployment({
        ...stateEmployment,
        [event.target.name]: event.target.checked,
      });
      if (event.target.checked === true) {
        setInputValue({
          ...inputValue,
          meal_allowance_paid: "1",
        });
      } else
        setInputValue({
          ...inputValue,
          meal_allowance_paid: "0",
        });
    }
  };

  const { index } = useParams();
  const navigate = useNavigate();

  const inputStyle = {
    marginTop: "8px !important",
    height: 47,
    border: errorTab ? "1px solid rgb(243, 174, 175)" : "inherit",
    backgroundColor: errorTab ? "rgb(255, 239, 239)" : "rgb(241, 243, 245)",
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = React.useState({
    name: "",
    mobile_number: "",
    tel_number: "",
    gender: "",
    bank_name: "",
    card_number: "",
    ktp_no: "",
    bank_account_no: "",
    family_card_number: "",
    safety_insurance_no: "",
    marriage_code: "",
    marriage_id: "",
    mother_name: "",
    pob: "",
    dob: "",
    home_address_1: "",
    home_address_2: "",
    nc_id: "",
    contract_start_date: "",
    health_insurance_no: "",
    department_id: "",
    type: "",
    basic_salary: "",
    position_name: "",
    entitle_ot: "0",
    meal_allowance_paid: "0",
    operational_allowance_paid: "1",
    attendance_allowance_paid: "1",
    grade_id: "",
    remark: "",
    benefits: "",
    audit_salary: "",
    safety_insurance: "",
    health_insurance: "",
    meal_allowance: "",
  });

  const [stateErr, setStateErr] = React.useState({
    name: false,
    gender: false,
    dob: false,
    ktp_no: false,
    nc_id: false,
    contract_start_date: false,
    type: false,
    basic_salary: false,
    audit_salary: false,
    safety_insurance: false,
    meal_allowance: false,
  });

  const [stateErrText, setStateErrText] = React.useState({
    name: false,
    gender: false,
    dob: false,
    ktp_no: false,
    nc_id: false,
    contract_start_date: false,
    type: false,
    basic_salary: false,
    audit_salary: false,
    safety_insurance: false,
    meal_allowance: false,
  });

  const informationErr =
    stateErrText.name ||
    stateErrText.gender ||
    stateErrText.ktp_no ||
    stateErrText.nc_id;

  const contactErr = stateErrText.type;
  const SalaryErr =
    stateErrText.audit_salary ||
    stateErrText.basic_salary ||
    stateErrText.meal_allowance ||
    stateErrText.safety_insurance;

  const buttonSubmit = informationErr || contactErr || SalaryErr;

  const handleValidateText = (name: string, err: boolean) => {
    setStateErrText({
      ...stateErrText,
      [name]: err,
    });
  };

  const handleValidate = (name: string, err: boolean) => {
    setStateErr({
      ...stateErr,
      [name]: err,
    });
  };

  const handleSelectDateOfBirth = (date: Date | null) => {
    setDateOfBirth(date);
    const dateString = moment(date).format("YYYY/MM/DD");
    setInputValue({
      ...inputValue,
      dob: dateString,
    });
  };

  const handleSelectStartDate = (date: Date | null) => {
    setStartDate(date);
    const dateString = moment(date).format("YYYY/MM/DD");
    setInputValue({
      ...inputValue,
      contract_start_date: dateString,
    });
  };

  const handleSelectContractDate = (date: Date | null) => {
    setContractDate(date);
    const dateString = moment(date).format("YYYY/MM/DD");
    setInputValue({
      ...inputValue,
      dob: dateString,
    });
  };

  const handleInputChange = (name: string, value: any) => {
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const genderOptions = [
    { value: "0", label: "Male" },
    { value: "1", label: "Female" },
  ];

  const marriageStatusOptions = [
    { value: "", label: "N/A" },
    { value: "0", label: "Married with 1 kid" },
    { value: "1", label: "Single" },
    { value: "2", label: "Married" },
  ];

  const employeeTypeOptions = [
    { value: "0", label: "Permanent" },
    { value: "1", label: "Part-time" },
    { value: "2", label: "Contract" },
  ];

  const positionOptions = [
    { value: "", label: "N/A" },
    { value: "0", label: "Junior" },
    { value: "1", label: "Vice Manager" },
    { value: "2", label: "Manager" },
  ];

  const departmentOptions = [
    { value: "", label: "N/A" },
    { value: "0", label: "Developer" },
    { value: "1", label: "Quality Controjk" },
    { value: "2", label: "Maintenance" },
    { value: "3", label: "Business Development" },
  ];

  return (
    <Box sx={{ marginTop: "10px" }}>
      <Box className="layout-create-update-data">
        <span style={{ fontSize: 29, fontWeight: "bold" }}>
          Employee Management
        </span>
        <Button
          disabled={buttonSubmit}
          className={buttonSubmit ? "button-save-disable" : "button-save"}
        >
          Save Change
        </Button>
      </Box>
      <Tabs
        sx={{ margin: "20px 0" }}
        value={valueTab}
        onChange={handleChangeTab}
      >
        <Tab
          icon={informationErr ? <img src={IconWarning} alt="" /> : ""}
          iconPosition="end"
          className={informationErr ? "button-tab-err" : "button-tab"}
          label="Employee Information"
          {...a11yProps(0)}
        />
        <Tab
          icon={contactErr ? <img src={IconWarning} alt="" /> : ""}
          iconPosition="end"
          className={contactErr ? "button-tab-err" : "button-tab"}
          label="Contact Information"
          {...a11yProps(1)}
        />
        <Tab
          className="button-tab"
          label="Employee Details"
          {...a11yProps(2)}
        />
        <Tab
          icon={SalaryErr ? <img src={IconWarning} alt="" /> : ""}
          iconPosition="end"
          className={SalaryErr ? "button-tab-err" : "button-tab"}
          label="Salary & Wages"
          {...a11yProps(3)}
        />
        <Tab className="button-tab" label="Others" {...a11yProps(4)} />
      </Tabs>
      <Box className="content-tabpanel">
        <TabPanel value={valueTab} index={0}>
          <Box className="title-tabpanel">
            <Typography sx={{ fontWeight: "500", fontSize: "20px" }}>
              Personal Information
            </Typography>
            <Typography sx={{ color: "#687076", fontSize: "14px" }}>
              Required(
              <IconRequired />)
            </Typography>
          </Box>

          <Divider />
          <Grid sx={{ padding: "10px 20px" }} container spacing={1}>
            <Grid container item spacing={10}>
              <InputLayout
                errorTextState={stateErrText.name}
                handleValidateText={handleValidateText}
                errorValidate={stateErr.name}
                handleValidate={handleValidate}
                name="name"
                title="Name"
                showIconRequired
                helperText="Please input Name"
                value={inputValue.name}
                onInputChangeValue={handleInputChange}
              />
              <InputLayout
                name="mobile_number"
                title="Mobile No."
                value={inputValue.mobile_number}
                onInputChangeValue={handleInputChange}
              />
            </Grid>

            <Grid container item spacing={10}>
              <Grid className="grid-items" item xs={6}>
                <SelectLayout
                  errorTextState={stateErrText.gender}
                  handleValidateText={handleValidateText}
                  defaultRender="Choose Gender"
                  errorValidate={stateErr.gender}
                  handleValidate={handleValidate}
                  name="gender"
                  title="Gender"
                  showIconRequired
                  helperText="Please input Gender"
                  value={inputValue.gender}
                  onInputChangeValue={handleInputChange}
                  listOptions={genderOptions}
                />
              </Grid>
              <InputLayout
                name="tel_number"
                title="Tel No."
                value={inputValue.tel_number}
                onInputChangeValue={handleInputChange}
              />
            </Grid>

            <Grid container item spacing={10}>
              <InputLayout
                name="mother_name"
                title="Mother Name"
                value={inputValue.mother_name}
                onInputChangeValue={handleInputChange}
              />
              <Grid className="grid-items" item xs={6}>
                <SelectLayout
                  defaultRender="Choose Marriage Status"
                  name="marriage_id"
                  title="Marriage Status"
                  value={inputValue.marriage_id}
                  onInputChangeValue={handleInputChange}
                  listOptions={marriageStatusOptions}
                />
              </Grid>
            </Grid>

            <Grid container item spacing={10}>
              <Grid className="grid-items" item xs={6}>
                <Typography>
                  Date of birth
                  <IconRequired />
                </Typography>
                <FormControl sx={{ width: "30ch" }}>
                  <DatePicker
                    selected={dateOfBirth}
                    onChange={(date) => handleSelectDateOfBirth(date)}
                    showYearDropdown
                    isClearable
                    dateFormat="yyyy/MM/dd"
                    scrollableYearDropdown
                    className="date-picker"
                  />
                  <img className="iconCalendar" src={iconCalendar} alt="" />

                  <ArrowDropDownIcon className="ArrowDropDownIcon" />
                </FormControl>
              </Grid>
              <InputLayout
                name="card_number"
                title="Bank Card No."
                value={inputValue.card_number}
                onInputChangeValue={handleInputChange}
              />
            </Grid>

            <Grid container item spacing={10}>
              <InputLayout
                name="pob"
                title="Place of birth"
                value={inputValue.pob}
                onInputChangeValue={handleInputChange}
              />
              <InputLayout
                name="bank_account_no"
                title="Bank Account No."
                value={inputValue.bank_account_no}
                onInputChangeValue={handleInputChange}
              />
            </Grid>

            <Grid container item spacing={10}>
              <InputLayout
                name="ktp_no"
                title="KTP No."
                showIconRequired
                value={inputValue.ktp_no}
                onInputChangeValue={handleInputChange}
                helperText="Please input KTP No."
                errorValidate={stateErr.ktp_no}
                handleValidate={handleValidate}
                errorTextState={stateErrText.ktp_no}
                handleValidateText={handleValidateText}
              />
              <InputLayout
                name="bank_name"
                title="Bank Name"
                value={inputValue.bank_name}
                onInputChangeValue={handleInputChange}
              />
            </Grid>

            <Grid container item spacing={10}>
              <InputLayout
                title="National Card ID"
                name="nc_id"
                value={inputValue.nc_id}
                onInputChangeValue={handleInputChange}
                showIconRequired
                helperText="Please input National Card ID"
                errorValidate={stateErr.nc_id}
                handleValidate={handleValidate}
                errorTextState={stateErrText.nc_id}
                handleValidateText={handleValidateText}
              />
              <InputLayout
                title="Family Card Number"
                name="family_card_number"
                value={inputValue.family_card_number}
                onInputChangeValue={handleInputChange}
              />
            </Grid>

            <Grid container item spacing={10}>
              <InputLayout
                title="Home Address 1"
                name="home_address_1"
                value={inputValue.home_address_1}
                onInputChangeValue={handleInputChange}
              />

              <InputLayout
                title="Safety Insurance No."
                name="safety_insurance_no"
                value={inputValue.safety_insurance_no}
                onInputChangeValue={handleInputChange}
              />
            </Grid>

            <Grid container item spacing={10}>
              <InputLayout
                title="Home Address 2"
                name="home_address_2"
                value={inputValue.home_address_2}
                onInputChangeValue={handleInputChange}
              />
              <InputLayout
                title="Health Insurance No."
                name="health_insurance_no"
                value={inputValue.health_insurance_no}
                onInputChangeValue={handleInputChange}
              />
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={valueTab} index={1}>
          <Box className="title-tabpanel">
            <Typography sx={{ fontWeight: "500", fontSize: "20px" }}>
              Contract Information
            </Typography>
            <Typography sx={{ color: "rgb(104, 112, 118)", fontSize: "14px" }}>
              Required(
              <IconRequired />)
            </Typography>
          </Box>

          <Divider />

          <Box className="contract-information-select">
            <Box className="select-form">
              <Typography>
                Date Start
                <IconRequired />
              </Typography>
              <FormControl sx={{ width: "25ch" }}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => handleSelectStartDate(date)}
                  showYearDropdown
                  isClearable
                  dateFormat="yyyy/MM/dd"
                  scrollableYearDropdown
                  className="date-picker date-contact"
                />
                <img className="iconCalendar" src={iconCalendar} alt="" />

                <ArrowDropDownIcon className="ArrowDropDownIcon" />
              </FormControl>
            </Box>

            <Box className="select-form">
              <SelectLayout
                defaultRender="Choose Type"
                errorValidate={stateErr.type}
                handleValidate={handleValidate}
                name="type"
                title="Employee Type"
                showIconRequired
                helperText="Please input Employee Type"
                value={inputValue.type}
                onInputChangeValue={handleInputChange}
                listOptions={employeeTypeOptions}
                errorTextState={stateErrText.type}
                handleValidateText={handleValidateText}
              />
            </Box>
          </Box>

          <Box sx={{ border: "1px solid #ccc", borderRadius: "6px" }}>
            <Typography className="contract">CONTRACT:</Typography>
            <Typography className="contract-extra">
              Please upload pdf, png, xlsx, docx file format!
            </Typography>
            <Divider />
            <Box sx={{ display: "flex" }}>
              <Box className="contract-information-select">
                <Box className="select-form">
                  <Typography>Contract Date</Typography>
                  <FormControl sx={{ width: "25ch" }}>
                    <DatePicker
                      selected={contractDate}
                      onChange={(date) => setStartDate(date)}
                      showYearDropdown
                      isClearable
                      dateFormat="yyyy/MM/dd"
                      scrollableYearDropdown
                      className="date-picker date-contact"
                    />
                    <img className="iconCalendar" src={iconCalendar} alt="" />

                    <ArrowDropDownIcon className="ArrowDropDownIcon" />
                  </FormControl>
                </Box>

                <Box className="select-form">
                  <Typography>Contract Name</Typography>
                  <FormControl sx={{ width: "25ch" }}>
                    <OutlinedInput sx={inputStyle} />
                  </FormControl>
                </Box>

                <Box className="select-form button-contract">
                  <Button className="button-upload-file">
                    <img
                      style={{ paddingRight: 5 }}
                      src={IconUploadFile}
                      alt=""
                    />
                    Upload File
                  </Button>
                  <Button
                    className="button-add-file"
                    style={{ width: 195, height: 48, marginTop: 10 }}
                  >
                    Add
                  </Button>
                </Box>
              </Box>

              <Divider orientation="vertical" flexItem></Divider>

              <Table sx={{ margin: "10px" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center" className="table-cell-first">
                      No
                    </TableCell>
                    <TableCell align="center">Contract Name</TableCell>
                    <TableCell align="center">Sign Date</TableCell>
                    <TableCell align="center" className="table-cell-last">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody></TableBody>
              </Table>
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={valueTab} index={2}>
          <Box className="title-tabpanel">
            <Typography sx={{ fontWeight: "500", fontSize: "20px" }}>
              Employment Details
            </Typography>
            <Typography sx={{ color: "rgb(104, 112, 118)", fontSize: "14px" }}>
              Required(
              <IconRequired />)
            </Typography>
          </Box>
          <Divider />
          <Box className="select-form">
            <Grid className="grid-items items-css" item xs={6}>
              <SelectLayout
                defaultRender="Choose Department"
                name="department_id"
                title="Department"
                value={inputValue.department_id}
                onInputChangeValue={handleInputChange}
                listOptions={departmentOptions}
              />
            </Grid>

            <Grid className="grid-items items-css" item xs={6}>
              <SelectLayout
                defaultRender="Choose Position"
                name="position_name"
                title="Position"
                value={inputValue.position_name}
                onInputChangeValue={handleInputChange}
                listOptions={positionOptions}
              />
            </Grid>
          </Box>

          <FormGroup className="items-css">
            <FormControlLabel
              control={
                <Checkbox
                  checked={stateEmployment.entitledOT}
                  onChange={handleChangeCheckBoxEmployment}
                  name="entitledOT"
                />
              }
              label="Entitled OT"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stateEmployment.mealAllowancePaid}
                  onChange={handleChangeCheckBoxEmployment}
                  name="mealAllowancePaid"
                />
              }
              label="Meal Allowance Paid"
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled
                  checkedIcon={<img src={IconCheckedDisable} alt="" />}
                  checked={stateEmployment.operationalAllowancePaidine}
                  icon={<img src={IconNotChecked} alt="" />}
                  name="operationalAllowancePaidine"
                />
              }
              label="Operational Allowance Paid"
            />
            <FormControlLabel
              control={
                <Checkbox
                  disabled
                  icon={<img src={IconNotChecked} alt="" />}
                  checkedIcon={<img src={IconCheckedDisable} alt="" />}
                  checked={stateEmployment.attendanceAllowancePaid}
                  name="attendanceAllowancePaid"
                />
              }
              label="Attendance Allowance Paid"
            />
          </FormGroup>
        </TabPanel>
        <TabPanel value={valueTab} index={3}>
          <Box className="title-tabpanel">
            <Typography sx={{ fontWeight: "500", fontSize: "20px" }}>
              Salary & Wages
            </Typography>
            <Typography sx={{ color: "rgb(104, 112, 118)", fontSize: "14px" }}>
              Required(
              <IconRequired />)
            </Typography>
          </Box>
          <Divider />
          <Box className="select-form items-css">
            <InputNumberLayout
              errorValidate={stateErr.basic_salary}
              handleValidate={handleValidate}
              showIconRequired
              helperText="Please input Salary"
              title="Basic Salary"
              name="basic_salary"
              value={inputValue.basic_salary}
              onInputChangeValue={handleInputChange}
              errorTextState={stateErrText.basic_salary}
              handleValidateText={handleValidateText}
            />
            <InputNumberLayout
              errorValidate={stateErr.audit_salary}
              handleValidate={handleValidate}
              showIconRequired
              helperText="Please input Salary (Audit)"
              title="Basic Salary (Audit)"
              name="audit_salary"
              value={inputValue.audit_salary}
              onInputChangeValue={handleInputChange}
              errorTextState={stateErrText.audit_salary}
              handleValidateText={handleValidateText}
            />
            <InputNumberLayout
              errorValidate={stateErr.safety_insurance}
              handleValidate={handleValidate}
              showIconRequired
              helperText="Please input Safety Insurance Amount"
              title="Safety Insurance Amount"
              name="safety_insurance"
              value={inputValue.safety_insurance}
              onInputChangeValue={handleInputChange}
              errorTextState={stateErrText.safety_insurance}
              handleValidateText={handleValidateText}
            />
            <InputNumberLayout
              title="Healthy Insurance Amount"
              name="health_insurance"
              value={inputValue.health_insurance}
              onInputChangeValue={handleInputChange}
            />
            <InputNumberLayout
              errorValidate={stateErr.meal_allowance}
              handleValidate={handleValidate}
              showIconRequired
              helperText="Please input Meal Allowance"
              title="Meal Allowance"
              name="meal_allowance"
              value={inputValue.meal_allowance}
              onInputChangeValue={handleInputChange}
              errorTextState={stateErrText.meal_allowance}
              handleValidateText={handleValidateText}
            />
          </Box>
        </TabPanel>
        <TabPanel value={valueTab} index={4}>
          <Box className="title-tabpanel">
            <Typography sx={{ fontWeight: "500", fontSize: "20px" }}>
              Others
            </Typography>
            <Typography sx={{ color: "rgb(104, 112, 118)", fontSize: "14px" }}>
              Required(
              <IconRequired />)
            </Typography>
          </Box>
          <Divider />
          <Box className="select-form">
            <Grid className="grid-items items-css" item xs={6}>
              <SelectLayout
                defaultRender=""
                name="grade_id"
                title="Grade"
                value={inputValue.grade_id}
                onInputChangeValue={handleInputChange}
                listOptions={positionOptions}
              />
            </Grid>

            <Grid className="grid-items items-css" item xs={6}>
              <SelectLayout
                defaultRender=""
                name="benefits"
                title="Benefit"
                value={inputValue.benefits}
                onInputChangeValue={handleInputChange}
                listOptions={positionOptions}
              />
            </Grid>

            <Box className="items-css grid-items">
              <Typography>Remark</Typography>
              <FormControl sx={{ width: "35ch" }}>
                <OutlinedInput
                  name="remark"
                  value={inputValue.remark}
                  onChange={(e) =>
                    handleInputChange(e.target.name, e.target.value)
                  }
                  multiline
                  maxRows={2}
                  sx={{
                    marginTop: "8px !important",
                    height: 80,
                    backgroundColor: "rgb(241, 243, 245)",
                  }}
                />
              </FormControl>
            </Box>

            <Box className="items-css grid-items">
              <Typography>HRM User Account</Typography>
              <FormControl sx={{ width: "35ch" }}>
                <Select
                  disabled
                  sx={{
                    marginTop: "8px !important",
                    height: 47,
                    backgroundColor: "#0000001f",
                  }}
                />
              </FormControl>
            </Box>
          </Box>

          <Box className="box-others">
            <Box
              className="items-css"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Typography sx={{ width: "205px" }}>Document</Typography>
              <Button
                className="button-upload-file"
                sx={{
                  width: "98px!important",
                  height: "32px!important",
                  fontSize: "14px!important",
                }}
              >
                <img style={{ paddingRight: 5 }} src={IconUploadFile} alt="" />
                Upload
              </Button>
            </Box>

            <Table sx={{ margin: "10px 0" }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" className="table-cell-first">
                    No
                  </TableCell>
                  <TableCell align="center">Document Name</TableCell>
                  <TableCell align="center">Created At</TableCell>
                  <TableCell align="center" className="table-cell-last">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default UpdateEmployee;
