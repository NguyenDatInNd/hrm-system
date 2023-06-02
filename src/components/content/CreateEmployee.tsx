import React, { ChangeEvent } from "react";
import { RootState, useAppDispatch } from "../../redux/store";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import IconWarning from "../../css/img/icon_warning.svg";
import IconUploadFile from "../../css/img/icon_upload_file.svg";
import IconNotChecked from "../../css/img/icon_not_checked.svg";
import ClearIcon from "@mui/icons-material/Clear";
import IconCheckedDisable from "../../css/img/icon_checked_disable.svg";
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
import { autocompleteStyles } from "../Home";
import { fetchCreateEmployee, fetchInforEmployee } from "../../redux/reducer";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  DateSelect,
  IconRequired,
  InputLayout,
  InputNumberLayout,
  SelectLayout,
} from "../Component_Input";

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

const genderOptions = [
  { value: 0, label: "Male" },
  { value: 1, label: "Female" },
];

const marriageStatusOptions = [
  { value: "", label: "N/A" },
  { value: 0, label: "Married with 1 kid" },
  { value: 1, label: "Single" },
  { value: 3, label: "Married" },
];

const employeeTypeOptions = [
  { value: 0, label: "Permanent" },
  { value: 1, label: "Part-time" },
  { value: 2, label: "Contract" },
];

const positionOptions = [
  { value: "", label: "N/A" },
  { value: 0, label: "Junior" },
  { value: 1, label: "Vice Manager" },
  { value: 2, label: "Manager" },
];

const departmentOptions = [
  { value: "", label: "N/A" },
  { value: 0, label: "Developer" },
  { value: 1, label: "Quality Controjk" },
  { value: 2, label: "Maintenance" },
  { value: 3, label: "Business Development" },
];

const CreateEmployee: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { index } = useParams();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [selectedFiles, setSelectedFiles] = React.useState<File[] | null>([]);
  const [valueTab, setValueTab] = React.useState(0);
  const [dobErr, setDobErr] = React.useState(false);
  const [startDateErr, setStartDateErr] = React.useState(true);
  const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(null);
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [contractDate, setContractDate] = React.useState<Date | null>(null);
  const [benefitOptions, setBenefitOptions] = React.useState<Array<any>>([]);
  const [grandeOptions, setGrandeOptions] = React.useState<Array<any>>([]);
  const [arrayBenefits, setArrayBenefits] = React.useState<any[]>([]);
  const [stateEmployment, setStateEmployment] = React.useState({
    entitledOT: false,
    mealAllowancePaid: false,
    operationalAllowancePaidine: true,
    attendanceAllowancePaid: true,
  });

  const handleChangeCheckBoxEmployment = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;
    if (name === "entitledOT") {
      setStateEmployment({
        ...stateEmployment,
        operationalAllowancePaidine: !checked,
        attendanceAllowancePaid: !checked,
        [name]: checked,
      });
      setInputValue({
        ...inputValue,
        entitle_ot: Number(checked),
        operational_allowance_paid: Number(!checked),
        attendance_allowance_paid: Number(!checked),
      });
    } else {
      setStateEmployment({
        ...stateEmployment,
        [name]: checked,
      });
      setInputValue({
        ...inputValue,
        meal_allowance_paid: Number(checked),
      });
    }
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValueTab(newValue);
  };

  const handleFileChangeContract = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setSelectedFile(selectedFile || null);
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
  };

  const handleAddFileContract = () => {
    if (selectedFile) {
      setSelectedFiles([...(selectedFiles || []), selectedFile]);
    }
    setSelectedFile(null);
  };

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
    contract_dates: "",
    contract_name: "",
    position_name: "",
    entitle_ot: 0,
    meal_allowance_paid: 0,
    operational_allowance_paid: 1,
    attendance_allowance_paid: 1,
    grade_id: -1,
    remark: "",
    benefits: [],
    basic_salary: "0",
    audit_salary: "0",
    safety_insurance: "0",
    health_insurance: "0",
    meal_allowance: "0",
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
    name: true,
    gender: true,
    ktp_no: true,
    nc_id: true,
    type: true,
    basic_salary: false,
    audit_salary: false,
    safety_insurance: false,
    meal_allowance: false,
  });

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://api-training.hrm.div4.pgtest.co/api/v1/grade",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        }
      );
      const data = await res.json();
      setGrandeOptions(data.data);
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://api-training.hrm.div4.pgtest.co/api/v1/benefit",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        }
      );
      const data = await res.json();
      setBenefitOptions(data.data);
    }
    fetchData();
  }, [dispatch]);

  const dataEmployeeId = useSelector((state: RootState) => state.InforEmployee);

  const informationErr =
    stateErrText.name ||
    stateErrText.gender ||
    stateErrText.ktp_no ||
    stateErrText.nc_id ||
    !dobErr;

  const contactErr = stateErrText.type || !startDateErr;
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

  const handleInputChange = (name: string, value: any) => {
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleDeleteOption = (option: any) => {
    const updatedOptions = inputValue.benefits.filter(
      (item) => item !== option
    );
    setInputValue({
      ...inputValue,
      benefits: updatedOptions,
    });
  };

  //hàm chuyển đổi object có value là number thành string
  function convertNumbersToStrings(
    obj: Record<string, any>
  ): Record<string, any> {
    const convertedObj: Record<string, any> = {};

    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        let value = obj[key];

        if (key === "grade_id" && value === -1) {
          value = "";
        } else if (typeof value === "number") {
          value = String(value);
        }

        convertedObj[key] = value;
      }
    }

    return convertedObj;
  }

  const handleOptionChange = (event: any, newValue: any) => {
    setArrayBenefits(newValue);
    const updatedBenefits = newValue.map((benefit: any) => benefit.id);
    setInputValue({
      ...inputValue,
      benefits: updatedBenefits,
    });
  };

  const handleOnSubmit = () => {
    const convertedData: Record<string, any> =
      convertNumbersToStrings(inputValue);
    dispatch(fetchCreateEmployee(convertedData));
    navigate("/employee");
  };

  React.useEffect(() => {
    if (index) {
      dispatch(fetchInforEmployee(index));
    }
  }, []);
  return (
    <Box sx={{ marginTop: "10px" }}>
      <Box className="layout-create-update-data">
        <span style={{ fontSize: 29, fontWeight: "bold" }}>
          Employee Management
        </span>
        <Button
          disabled={buttonSubmit}
          className={buttonSubmit ? "button-save-disable" : "button-save"}
          onClick={handleOnSubmit}
        >
          {index ? "Save change" : "Add"}
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
            {index && (
              <Grid container item spacing={10}>
                <Grid className="grid-items" item xs={6}>
                  <Typography>NIK</Typography>
                  <FormControl sx={{ width: "30ch" }}>
                    <OutlinedInput
                      disabled
                      className="input-value-style"
                      value={dataEmployeeId.staff_id}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            )}

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
                value={index ? dataEmployeeId.name : inputValue.name}
                onInputChangeValue={handleInputChange}
              />
              <InputLayout
                numberic
                name="mobile_number"
                title="Mobile No."
                value={
                  index
                    ? dataEmployeeId?.mobile_number
                    : inputValue.mobile_number
                }
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
                  value={index ? dataEmployeeId?.gender : inputValue.gender}
                  onInputChangeValue={handleInputChange}
                  listOptions={genderOptions}
                />
              </Grid>
              <InputLayout
                numberic
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
                <DateSelect
                  isErr={dobErr}
                  setIsErr={setDobErr}
                  startDate={dateOfBirth}
                  setStartDate={setDateOfBirth}
                  handleSelectDatePicker={handleInputChange}
                  name="dob"
                />
              </Grid>
              <InputLayout
                numberic
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
                numberic
                name="bank_account_no"
                title="Bank Account No."
                value={inputValue.bank_account_no}
                onInputChangeValue={handleInputChange}
              />
            </Grid>

            <Grid container item spacing={10}>
              <InputLayout
                numberic
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
                numberic
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
                numberic
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
                numberic
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
                numberic
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
              <DateSelect
                isErr={startDateErr}
                setIsErr={setStartDateErr}
                startDate={startDate}
                setStartDate={setStartDate}
                handleSelectDatePicker={handleInputChange}
                name="contract_start_date"
              />
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
                  <DateSelect
                    startDate={contractDate}
                    setStartDate={setContractDate}
                    handleSelectDatePicker={handleInputChange}
                    name="contract_dates"
                  />
                </Box>

                <Box className="select-form">
                  <Typography>Contract Name</Typography>
                  <FormControl sx={{ width: "25ch" }}>
                    <OutlinedInput className="input-value-style" />
                  </FormControl>
                </Box>

                <Box className="select-form button-contract">
                  <Button component="label" className="button-upload-file">
                    <img
                      style={{ paddingRight: 5 }}
                      src={IconUploadFile}
                      alt=""
                    />
                    <span>Upload File </span>
                    <input
                      accept="image/*,.pdf,.csv,.xlsx,.docx"
                      type="file"
                      hidden
                      onChange={handleFileChangeContract}
                    />
                  </Button>
                  <Button
                    className="button-add-file"
                    style={{ width: 195, height: 48, marginTop: 10 }}
                    onClick={handleAddFileContract}
                  >
                    Add
                  </Button>
                  {selectedFile && (
                    <div className="file-selected">
                      <span className="name-file-selected">
                        {selectedFile.name}
                      </span>
                      <button
                        className="icon-delete-file-selected"
                        onClick={handleDeleteFile}
                      >
                        X
                      </button>
                    </div>
                  )}
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
              <Typography>Grade</Typography>
              <FormControl sx={{ width: "35ch" }}>
                <Autocomplete
                  disablePortal
                  options={grandeOptions}
                  sx={autocompleteStyles}
                  getOptionLabel={(option) => option.name}
                  value={
                    inputValue.grade_id !== -1
                      ? grandeOptions[inputValue.grade_id]
                      : null
                  }
                  onChange={(event, newValue) => {
                    if (newValue) {
                      const selectedIndex = grandeOptions.findIndex(
                        (item) => item.name === newValue.name
                      );
                      setInputValue({
                        ...inputValue,
                        grade_id: selectedIndex,
                      });
                    } else {
                      setInputValue({
                        ...inputValue,
                        grade_id: -1,
                      });
                    }
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li
                      {...props}
                      style={{
                        backgroundColor: selected ? "#e9f9ee" : "inherit",
                        color: selected ? "#30a46c" : "inherit",
                        padding: "6px 16px",
                        fontSize: "16px",
                      }}
                    >
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => <TextField {...params} />}
                />
                {inputValue.grade_id !== -1 && (
                  <Stack direction="row" spacing={1}>
                    {grandeOptions[inputValue.grade_id]?.benefits.map(
                      (grade: any) => (
                        <div key={grade.id}>
                          <Chip label={grade.name} />
                        </div>
                      )
                    )}
                  </Stack>
                )}
              </FormControl>
            </Grid>

            <Grid className="grid-items items-css" item xs={6}>
              <Typography>Benefit</Typography>
              <FormControl sx={{ width: "35ch" }}>
                <Autocomplete
                  multiple
                  options={benefitOptions}
                  getOptionLabel={(option) => option.name}
                  value={arrayBenefits ?? undefined}
                  sx={autocompleteStyles}
                  onChange={handleOptionChange}
                  disableCloseOnSelect
                  clearIcon={<ClearIcon />}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        maxHeight: "150px",
                        overflowY: "auto",
                        overflowX: "hidden",
                        marginTop: "5px",
                      }}
                    />
                  )}
                  renderOption={(props, option, { selected }) => (
                    <li
                      {...props}
                      style={{
                        backgroundColor: selected ? "#e9f9ee" : "inherit",
                        color: selected ? "#30a46c" : "inherit",
                        padding: "6px 16px",
                        fontSize: "15px",
                      }}
                    >
                      {option.name}
                    </li>
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option.name}
                        {...getTagProps({ index })}
                        onDelete={() => handleDeleteOption(option)}
                        deleteIcon={
                          <ClearIcon
                            onClick={() => handleDeleteOption(option)}
                            style={{ fontSize: 14 }}
                          />
                        }
                      />
                    ))
                  }
                />
              </FormControl>
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
                >
                  <MenuItem />
                </Select>
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

export default CreateEmployee;
