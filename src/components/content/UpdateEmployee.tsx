import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/store";
import OutlinedInput from "@mui/material/OutlinedInput";
import DatePicker from "react-datepicker";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormControl, { useFormControl } from "@mui/material/FormControl";
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
}: InputProps) {
  const [error, setError] = React.useState(errorValidate);
  const handleInputChangeValue = (name: string, value: string) => {
    onInputChangeValue(name, value);
  };
  if (name === "name") console.log(name, error);
  React.useEffect(() => {
    handleValidate && handleValidate(name, error);
    // handleValidate && console.log(name, error)
  }, [error]);

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
          />
        )}
      </FormControl>
    </Grid>
  );
}

interface InputNumberProps {
  showIconRequired?: boolean;
  helperText?: string;
  inputStyle: any;
  title: string;
}

function InputNumberLayout({
  showIconRequired,
  helperText,
  inputStyle,
  title,
}: InputNumberProps) {
  const [inputValue, setInputValue] = React.useState(0);
  const [error, setError] = React.useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setInputValue(value);
    console.log(value);
  };
  return (
    <>
      <Typography>
        {title}
        {showIconRequired && <IconRequired />}
      </Typography>
      <FormControl sx={{ width: "35ch" }}>
        <OutlinedInput
          sx={inputStyle}
          type="number"
          defaultValue="0"
          // value={inputValue}
          onChange={handleInputChange}
          startAdornment={
            <InputAdornment position="start">
              <IconButton sx={{ paddingRight: "0 !important" }} disabled>
                <Typography className="icon_Rp">Rp</Typography>
              </IconButton>
            </InputAdornment>
          }
        />
        {/* {inputValue < 0 && (
          <MyFormHelperText message="Please input value min is 0" />
        )} */}
        {helperText && (
          <MyFormHelperText
            message={helperText}
            error={error}
            setError={setError}
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
}: {
  message?: string;
  error?: boolean;
  setError: Function;
}) {
  const [errorText, setErrorText] = React.useState(false);
  const [isFocused, setFocused] = React.useState(false);
  const { focused, filled } = useFormControl() || {};

  React.useEffect(() => {
    if (!filled) {
      setErrorText(true);
    } else {
      setErrorText(false);
    }
    if (focused) {
      setFocused(true);
    }

    if (errorText && isFocused) {
      setError(true);
    } else if (filled) {
      setError(false);
    }
  }, [filled, focused, errorText]);

  return <FormHelperText error>{error && message}</FormHelperText>;
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
  const [value, setValue] = React.useState(0);
  const [errorTab, setErrorTab] = React.useState<boolean>(false);
  const [gender, setGender] = React.useState<string>("");
  const [department, setDepartment] = React.useState<string>("");
  const [employeeType, setEmployeeType] = React.useState<string>("");
  const [position, setPosition] = React.useState<string>("");
  const [startDate, setStartDate] = React.useState<Date | null>(null);

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
    } else
      setStateEmployment({
        ...stateEmployment,
        [event.target.name]: event.target.checked,
      });
  };

  const {
    entitledOT,
    mealAllowancePaid,
    operationalAllowancePaidine,
    attendanceAllowancePaid,
  } = stateEmployment;

  const { index } = useParams();
  const navigate = useNavigate();

  const inputStyle = {
    marginTop: "8px !important",
    height: 47,
    border: errorTab ? "1px solid rgb(243, 174, 175)" : "inherit",
    backgroundColor: errorTab ? "rgb(255, 239, 239)" : "rgb(241, 243, 245)",
  };

  const handleChangeGender = (e: SelectChangeEvent<typeof gender>) => {
    setGender(e.target.value);
  };

  const handleChangeEmployeeType = (e: SelectChangeEvent<typeof gender>) => {
    setEmployeeType(e.target.value);
  };

  const handleChangeDepartment = (e: SelectChangeEvent<typeof gender>) => {
    setDepartment(e.target.value);
  };

  const handleChangePosition = (e: SelectChangeEvent<typeof gender>) => {
    setPosition(e.target.value);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
    mother_name: "",
    pob: "",
    dob: "",
    home_address_1: "",
    home_address_2: "",
    nc_id: "",
    contract_start_date: "",
    health_insurance_no: "",
    department_name: "",
    type: "",
    basic_salary: "",
    position_name: "",
    entitle_ot: "",
    meal_allowance_paid: "",
    meal_allowance: "",
    grade_name: "",
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
    basic_salary_Audit: false,
  });

  const handleValidate = (name: string, err: boolean) => {
    setStateErr({
      ...stateErr,
      [name]: err,
    });
  };
  // console.log(stateErr)

  const handleSelectDate = (date: Date | null) => {
    setStartDate(date);
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

  return (
    <>
      <Box sx={{ marginTop: "10px" }}>
        <Box className="layout-create-update-data">
          <span style={{ fontSize: 29, fontWeight: "bold" }}>
            Employee Management
          </span>
          <Button className="button-save">Save Change</Button>
        </Box>
        <Tabs sx={{ margin: "20px 0" }} value={value} onChange={handleChange}>
          <Tab
            className="button-tab"
            label="Employee Information"
            {...a11yProps(0)}
          />
          <Tab
            className="button-tab"
            label="Contact Information"
            {...a11yProps(1)}
          />
          <Tab
            className="button-tab"
            label="Employee Details"
            {...a11yProps(2)}
          />
          <Tab
            className="button-tab"
            label="Salary & Wages"
            {...a11yProps(3)}
          />
          <Tab className="button-tab" label="Others" {...a11yProps(4)} />
        </Tabs>
        <Box className="content-tabpanel">
          <TabPanel value={value} index={0}>
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
                  errorValidate={stateErr.name}
                  name="name"
                  title="Name"
                  showIconRequired
                  helperText="Please input Name"
                  value={inputValue.name}
                  onInputChangeValue={handleInputChange}
                  handleValidate={handleValidate}
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
                  <Typography>
                    Gender
                    <IconRequired />
                  </Typography>
                  <FormControl sx={{ width: "30ch" }}>
                    <Select
                      sx={inputStyle}
                      value={gender}
                      displayEmpty
                      onChange={handleChangeGender}
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <span className="text-choose-gender">
                              Choose Gender
                            </span>
                          );
                        }

                        return selected;
                      }}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                    {/* <MyFormHelperText message="Please input Gender" /> */}
                  </FormControl>
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
                <InputLayout
                  name="card_number"
                  title="Bank Card No."
                  value={inputValue.card_number}
                  onInputChangeValue={handleInputChange}
                />
              </Grid>

              <Grid container item spacing={10}>
                <Grid className="grid-items" item xs={6}>
                  <Typography>
                    Date of birth
                    <IconRequired />
                  </Typography>
                  <FormControl sx={{ width: "30ch" }}>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => handleSelectDate(date)}
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
                  name="bank_account_no"
                  title="Bank Account No."
                  value={inputValue.bank_account_no}
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
                  name="bank_name"
                  title="Bank Name"
                  value={inputValue.bank_name}
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
                  title="National Card ID"
                  name="nc_id"
                  value={inputValue.nc_id}
                  onInputChangeValue={handleInputChange}
                  showIconRequired
                  helperText="Please input National Card ID"
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
                  title="Home Address 1"
                  name="home_address_1"
                  value={inputValue.home_address_1}
                  onInputChangeValue={handleInputChange}
                />
                <InputLayout
                  title="Health Insurance No."
                  name="health_insurance_no"
                  value={inputValue.health_insurance_no}
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
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <Box className="title-tabpanel">
              <Typography sx={{ fontWeight: "500", fontSize: "20px" }}>
                Contract Information
              </Typography>
              <Typography
                sx={{ color: "rgb(104, 112, 118)", fontSize: "14px" }}
              >
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
                <Typography>
                  Employee Type
                  <IconRequired />
                </Typography>
                <FormControl sx={{ width: "25ch" }}>
                  <Select
                    sx={inputStyle}
                    value={employeeType}
                    displayEmpty
                    onChange={handleChangeEmployeeType}
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span className="text-choose-gender">
                            Choose Type
                          </span>
                        );
                      }

                      return selected;
                    }}
                  >
                    <MenuItem value="Permanent">Permanent</MenuItem>
                    <MenuItem value="Part-time">Part-time</MenuItem>
                    <MenuItem value="Contract">Contract</MenuItem>
                  </Select>
                  {/* <MyFormHelperText message="Please input Gender" /> */}
                </FormControl>
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
                        selected={startDate}
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

          <TabPanel value={value} index={2}>
            <Box className="title-tabpanel">
              <Typography sx={{ fontWeight: "500", fontSize: "20px" }}>
                Employment Details
              </Typography>
              <Typography
                sx={{ color: "rgb(104, 112, 118)", fontSize: "14px" }}
              >
                Required(
                <IconRequired />)
              </Typography>
            </Box>
            <Divider />
            <Box className="select-form">
              <Grid className="grid-items items-css" item xs={6}>
                <Typography>Department</Typography>
                <FormControl sx={{ width: "35ch" }}>
                  <Select
                    sx={inputStyle}
                    value={department}
                    displayEmpty
                    onChange={handleChangeDepartment}
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span className="text-choose-gender">
                            Choose Department
                          </span>
                        );
                      }

                      return selected;
                    }}
                  >
                    <MenuItem value="">N/A</MenuItem>
                    <MenuItem value="Developer">Developer</MenuItem>
                    <MenuItem value="Quality Controjk">
                      Quality Controjk
                    </MenuItem>
                    <MenuItem value="Maintenance">Maintenance</MenuItem>
                    <MenuItem value="Business Development">
                      Business Development
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid className="grid-items items-css" item xs={6}>
                <Typography>Position</Typography>
                <FormControl sx={{ width: "35ch" }}>
                  <Select
                    sx={inputStyle}
                    value={position}
                    displayEmpty
                    onChange={handleChangePosition}
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span className="text-choose-gender">
                            Choose Position
                          </span>
                        );
                      }

                      return selected;
                    }}
                  >
                    <MenuItem value="">N/A</MenuItem>
                    <MenuItem value="Junior">Junior</MenuItem>
                    <MenuItem value="Vice Manager">Vice Manager</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Box>

            <FormGroup className="items-css">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={entitledOT}
                    onChange={handleChangeCheckBoxEmployment}
                    name="entitledOT"
                  />
                }
                label="Entitled OT"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mealAllowancePaid}
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
                    checked={operationalAllowancePaidine}
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
                    checked={attendanceAllowancePaid}
                    name="attendanceAllowancePaid"
                  />
                }
                label="Attendance Allowance Paid"
              />
            </FormGroup>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Box className="title-tabpanel">
              <Typography sx={{ fontWeight: "500", fontSize: "20px" }}>
                Salary & Wages
              </Typography>
              <Typography
                sx={{ color: "rgb(104, 112, 118)", fontSize: "14px" }}
              >
                Required(
                <IconRequired />)
              </Typography>
            </Box>
            <Divider />
            <Box className="select-form items-css">
              <InputNumberLayout
                showIconRequired
                helperText="Please input Salary"
                inputStyle={inputStyle}
                title="Basic Salary"
              />
              <InputNumberLayout
                showIconRequired
                helperText="Please input Salary (Audit)"
                inputStyle={inputStyle}
                title="Basic Salary (Audit)"
              />
              <InputNumberLayout
                showIconRequired
                helperText="Please input Safety Insurance Amount"
                inputStyle={inputStyle}
                title="Safety Insurance Amount"
              />
              <InputNumberLayout
                inputStyle={inputStyle}
                title="Healthy Insurance Amount"
              />
              <InputNumberLayout
                showIconRequired
                helperText="Please input Meal Allowance"
                inputStyle={inputStyle}
                title="Meal Allowance"
              />
            </Box>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Box className="title-tabpanel">
              <Typography sx={{ fontWeight: "500", fontSize: "20px" }}>
                Others
              </Typography>
              <Typography
                sx={{ color: "rgb(104, 112, 118)", fontSize: "14px" }}
              >
                Required(
                <IconRequired />)
              </Typography>
            </Box>
            <Divider />
            <Box className="select-form">
              <Grid className="grid-items items-css" item xs={6}>
                <Typography>Grade</Typography>
                <FormControl sx={{ width: "35ch" }}>
                  <Select
                    sx={inputStyle}
                    value={department}
                    onChange={handleChangeDepartment}
                  >
                    <MenuItem value="Developer">Developer</MenuItem>
                    <MenuItem value="Quality Controjk">
                      Quality Controjk
                    </MenuItem>
                    <MenuItem value="Maintenance">Maintenance</MenuItem>
                    <MenuItem value="Business Development">
                      Business Development
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid className="grid-items items-css" item xs={6}>
                <Typography>Benefit</Typography>
                <FormControl sx={{ width: "35ch" }}>
                  <Select
                    sx={inputStyle}
                    value={position}
                    onChange={handleChangePosition}
                  >
                    <MenuItem value="Junior">Junior</MenuItem>
                    <MenuItem value="Vice Manager">Vice Manager</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Box className="items-css grid-items">
                <Typography>Remark</Typography>
                <FormControl sx={{ width: "35ch" }}>
                  <OutlinedInput
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
                  <img
                    style={{ paddingRight: 5 }}
                    src={IconUploadFile}
                    alt=""
                  />
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
    </>
  );
};

export default UpdateEmployee;
