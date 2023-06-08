import React, { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import { RootState, useAppDispatch } from "../../redux/store";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import IconWarning from "../../css/img/icon_warning.svg";
import IconUploadFile from "../../css/img/icon_upload_file.svg";
import IconNotChecked from "../../css/img/icon_not_checked.svg";
import IconDownLoad from "../../css/img/icon_download.svg";
import CloseIcon from "@mui/icons-material/Close";
import iconDeleteActive from "../../css/img/iconDelete.svg";
import ClearIcon from "@mui/icons-material/Clear";
import IconCheckedDisable from "../../css/img/icon_checked_disable.svg";
import iconCalendar from "../../css/img/icon_calendar.svg";
import moment from "moment";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { autocompleteStyles } from "../Home";
import {
  convertNumbersToStrings,
  fetchCreateEmployee,
  fetchInforEmployee,
  fetchUpdateEmployee,
} from "../../redux/reducer";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  DateSelect,
  IconRequired,
  InputLayout,
  InputNumberLayout,
  SelectLayout,
  TabPanel,
  employeeTypeOptions,
  genderOptions,
  marriageStatusOptions,
  a11yProps,
  positionOptions,
  departmentOptions,
} from "../Component_Input";
import { notification } from "antd";

const CreateEmployee: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { index } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const [open, setOpen] = React.useState(false);
  const [selectedFileContract, setSelectedFileContract] =
    React.useState<File | null>(null);
  const [selectedFileOther, setSelectedFileOther] = React.useState<any[]>([]);
  const [valueTab, setValueTab] = React.useState(0);
  const [indexFile, setIndexFile] = React.useState<any>();
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

  const [contractData, setContractData] = React.useState<Array<any>>([]);

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
    setSelectedFileContract(selectedFile || null);
  };

  const handleFileChangeOther = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      for (let i = 0; i < selectedFiles.length; i++) {
        const newData = {
          otherFile_name: selectedFiles[i].name,
          otherFile_date: new Date(),
          otherFile_file: selectedFiles[i],
        };
        setSelectedFileOther((prevData) => [...prevData, newData]);
      }
    }
  };

  const handleAddFileContract = () => {
    if (
      inputValue.contract_name &&
      inputValue.contract_dates &&
      selectedFileContract
    ) {
      const newData = {
        contract_name: inputValue.contract_name,
        contract_date: inputValue.contract_dates,
        contract_file: selectedFileContract,
      };
      setContractData((prevData) => [...prevData, newData]);
      setSelectedFileContract(null);
      setContractDate(null);
      setInputValue({
        ...inputValue,
        contract_dates: "",
        contract_name: "",
      });
    }
  };

  const handleDeleteContract = () => {
    setContractData((prevData) => prevData.filter((_, i) => i !== indexFile));
    setOpen(false);
  };

  const handleDownload = (a: any) => {
    const url = a;
    const link = document.createElement("a");
    link.href = url;
    link.download = a.split("/").pop();
    document.body.appendChild(link);
    link.dispatchEvent(new MouseEvent("click"));
    document.body.removeChild(link);
  };

  const dataEmployeeId = useSelector((state: RootState) => state.InforEmployee);
  const message = useSelector(
    (state: RootState) => state.MessageCreateEmployee
  );

  const [inputValue, setInputValue] = React.useState<any>({
    name: "",
    mobile_no: "",
    tel_no: "",
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
    position_id: "",
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
      const resGrade = await fetch(
        "https://api-training.hrm.div4.pgtest.co/api/v1/grade",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        }
      );
      const dataGrade = await resGrade.json();
      setGrandeOptions(dataGrade.data);

      const resBenefit = await fetch(
        "https://api-training.hrm.div4.pgtest.co/api/v1/benefit",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        }
      );
      const dataBenefit = await resBenefit.json();
      setBenefitOptions(dataBenefit.data);
    }
    fetchData();
  }, []);

  React.useEffect(() => {
    index && dispatch(fetchInforEmployee(index));
  }, [dispatch, index]);

  React.useEffect(() => {
    if (index && dataEmployeeId) {
      setInputValue(dataEmployeeId);
      dataEmployeeId?.dob && setDateOfBirth(new Date(dataEmployeeId?.dob));
      dataEmployeeId?.contract_start_date &&
        setStartDate(new Date(dataEmployeeId?.contract_start_date));
      setStateErrText({
        ...stateErrText,
        type: false,
        name: false,
        gender: false,
        ktp_no: false,
        nc_id: false,
      });
      setStateEmployment({
        ...stateEmployment,
        operationalAllowancePaidine: Boolean(
          dataEmployeeId?.operational_allowance_paid
        ),
        attendanceAllowancePaid: Boolean(
          dataEmployeeId?.attendance_allowance_paid
        ),
        entitledOT: Boolean(dataEmployeeId?.entitle_ot),
        mealAllowancePaid: Boolean(dataEmployeeId?.meal_allowance_paid),
      });
      dataEmployeeId?.contracts && setContractData(dataEmployeeId?.contracts);
      dataEmployeeId?.documents &&
        setSelectedFileOther(dataEmployeeId?.documents);
      dataEmployeeId?.benefits && setArrayBenefits(dataEmployeeId?.benefits);
    }
  }, [dataEmployeeId]);

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

  const handleSelectDateContract = (date: Date | null) => {
    setContractDate(date);
    const dateString = moment(date).format("YYYY-MM-DD");
    setInputValue({
      ...inputValue,
      contract_dates: dateString,
    });
  };

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
      (item: any) => item !== option
    );
    setInputValue({
      ...inputValue,
      benefits: updatedOptions,
    });
  };

  const handleOptionChange = (event: any, newValue: any) => {
    setArrayBenefits(newValue);
    const updatedBenefits = newValue.map((benefit: any) => benefit.id);
    setInputValue({
      ...inputValue,
      benefits: updatedBenefits,
    });
  };

  const openNotification = (message: any) => {
    api.open({
      message: "",
      description: message,
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_256_19180)">
            <path
              d="M20.1667 10.1567V11C20.1656 12.9767 19.5255 14.9001 18.3419 16.4833C17.1584 18.0666 15.4947 19.2248 13.5991 19.7852C11.7035 20.3457 9.67753 20.2784 7.82331 19.5934C5.96908 18.9083 4.38597 17.6423 3.31009 15.984C2.2342 14.3257 1.72318 12.3641 1.85324 10.3916C1.98331 8.41919 2.74748 6.54164 4.0318 5.03899C5.31611 3.53634 7.05176 2.48911 8.97988 2.05348C10.908 1.61784 12.9253 1.81715 14.7309 2.62168"
              stroke="#12A594"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M20.1667 3.66666L11 12.8425L8.25 10.0925"
              stroke="#12A594"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_256_19180">
              <rect width="22" height="22" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
      ),
      style: {
        color: "#12a594",
        fontWeight: 600,
        background: "#d9f3ee",
      },
    });
  };

  const handleOnSubmit = () => {
    const convertedData: Record<string, any> =
      convertNumbersToStrings(inputValue);
    if (index) {
      dispatch(
        fetchUpdateEmployee({
          data: convertedData,
          dataContract: contractData,
          dataOther: selectedFileOther,
        })
      );
    } else
      dispatch(
        fetchCreateEmployee({
          data: convertedData,
          dataContract: contractData,
          dataOther: selectedFileOther,
        })
      );
    setArrayBenefits([]);
    navigate("/employee");
    openNotification(message);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
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
                        value={inputValue?.staff_id}
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
                  value={inputValue.name}
                  onInputChangeValue={handleInputChange}
                />
                <InputLayout
                  numberic
                  name="mobile_no"
                  title="Mobile No."
                  value={inputValue.mobile_no}
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
                  numberic
                  name="tel_no"
                  title="Tel No."
                  value={inputValue.tel_no}
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
                  index={!!index}
                  defaultRender="Choose Type"
                  errorValidate={stateErr.type}
                  handleValidate={handleValidate}
                  name="type"
                  title="Employee Type"
                  showIconRequired
                  helperText="Please input Employee Type"
                  onInputChangeValue={handleInputChange}
                  errorTextState={stateErrText.type}
                  handleValidateText={handleValidateText}
                  value={inputValue.type}
                  listOptions={employeeTypeOptions}
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
                <Box
                  className="contract-information-select"
                  sx={{ maxWidth: "350px" }}
                >
                  <Box className="select-form">
                    <Typography>Contract Date</Typography>
                    <FormControl sx={{ width: " 25ch" }}>
                      <DatePicker
                        selected={contractDate}
                        onChange={(date) => handleSelectDateContract(date)}
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
                      <OutlinedInput
                        name="contract_name"
                        className="input-value-style"
                        onChange={(e) => {
                          handleInputChange(e.target.name, e.target.value);
                        }}
                        value={inputValue.contract_name}
                      />
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
                    {selectedFileContract && (
                      <div className="file-selected">
                        <span className="name-file-selected">
                          {selectedFileContract.name}
                        </span>
                        <button
                          className="icon-delete-file-selected"
                          onClick={() => setSelectedFileContract(null)}
                        >
                          X
                        </button>
                      </div>
                    )}
                  </Box>
                </Box>

                <Divider orientation="vertical" flexItem></Divider>
                <Box
                  sx={{
                    width: "100%",
                    maxHeight: "300px",
                    overflowX: "hidden",
                  }}
                >
                  <Table stickyHeader sx={{ margin: "10px" }}>
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
                    <TableBody>
                      {contractData &&
                        contractData.map((row, id) => {
                          return (
                            <TableRow className="row-contract" key={id}>
                              <TableCell
                                className="row-contract"
                                sx={{ textAlign: "center" }}
                              >
                                {id + 1}
                              </TableCell>
                              <TableCell
                                className="row-contract"
                                sx={{ textAlign: "center", width: "150px" }}
                              >
                                {row.contract_name || row.name}
                              </TableCell>
                              <TableCell
                                className="row-contract"
                                sx={{ textAlign: "center", width: "150px" }}
                              >
                                {row.contract_date}
                              </TableCell>
                              <TableCell className="row-contract">
                                {row?.document && (
                                  <Chip
                                    className="download-contract"
                                    icon={<img src={IconDownLoad} alt="" />}
                                    label={`${row?.document?.split("/").pop()}`}
                                    onClick={() =>
                                      handleDownload(row?.document)
                                    }
                                  />
                                )}
                                <Chip
                                  className="delete-contract"
                                  icon={<img src={iconDeleteActive} alt="" />}
                                  label="Delete"
                                  onClick={() => {
                                    setOpen(true);
                                    setIndexFile(id);
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </Box>
              </Box>
            </Box>
          </TabPanel>

          <TabPanel value={valueTab} index={2}>
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
                  name="position_id"
                  title="Position"
                  value={inputValue.position_id}
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
                  <Autocomplete
                    disablePortal
                    options={grandeOptions}
                    sx={autocompleteStyles}
                    getOptionLabel={(option) => option.name}
                    value={
                      grandeOptions.find(
                        (item) => item.id === inputValue.grade_id
                      ) || null
                    }
                    onChange={(event, newValue) => {
                      if (newValue) {
                        const selectedIndex = grandeOptions.findIndex(
                          (item) => item.name === newValue.name
                        );
                        setInputValue({
                          ...inputValue,
                          grade_id: grandeOptions[selectedIndex]?.id,
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
                      {grandeOptions.map(
                        (grade) =>
                          grade.id === inputValue.grade_id &&
                          grade?.benefits.map((grade: any) => (
                            <div key={grade.id}>
                              <Chip label={grade.name} />
                            </div>
                          ))
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
                    renderOption={(props, option, { selected }) => {
                      const isSelected =
                        inputValue.benefits &&
                        inputValue.benefits.some(
                          (item: any) => item.id === option.id
                        );
                      return (
                        <li
                          {...props}
                          style={{
                            backgroundColor: isSelected ? "#e9f9ee" : "inherit",
                            color: isSelected ? "#30a46c" : "inherit",
                            padding: "6px 16px",
                            fontSize: "15px",
                          }}
                        >
                          {option.name}
                        </li>
                      );
                    }}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip
                          label={option?.name}
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
                  component="label"
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
                  <input
                    multiple
                    accept="image/*,.pdf,.csv,.xlsx,.docx"
                    type="file"
                    hidden
                    onChange={handleFileChangeOther}
                  />
                </Button>
              </Box>
              <Table stickyHeader sx={{ margin: "10px" }}>
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
                <TableBody>
                  {selectedFileOther &&
                    selectedFileOther.map((row, id) => {
                      return (
                        <TableRow className="row-contract" key={id}>
                          <TableCell
                            className="row-contract"
                            sx={{ textAlign: "center" }}
                          >
                            {id + 1}
                          </TableCell>
                          <TableCell
                            className="row-contract row-other-name"
                            sx={{ textAlign: "center", width: "150px" }}
                          >
                            {row.otherFile_name ||
                              row.document.split("/").pop()}
                          </TableCell>
                          <TableCell
                            className="row-contract"
                            sx={{ textAlign: "center", width: "150px" }}
                          >
                            {moment(row.otherFile_date).format("YYYY/MM/DD")}
                          </TableCell>
                          <TableCell
                            className="row-contract"
                            sx={{ textAlign: "center" }}
                          >
                            {row?.document && (
                              <Chip
                                className="download-other"
                                icon={<img src={IconDownLoad} alt="" />}
                                onClick={() => handleDownload(row?.document)}
                              />
                            )}
                            <Chip
                              className="delete-other"
                              icon={<img src={iconDeleteActive} alt="" />}
                              onClick={() => {
                                setSelectedFileOther((prevData) =>
                                  prevData.filter((_, i) => i !== id)
                                );
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Box>
          </TabPanel>
        </Box>
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>
            Delete{" "}
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </DialogTitle>
          <DialogContent>
            {`This will delete the ${contractData[indexFile]?.contract_name} record. Are you sure to continue?`}
          </DialogContent>
          <DialogActions>
            <Button className="button-cancel" onClick={handleClose}>
              No
            </Button>
            <Button
              className="button-agree"
              onClick={handleDeleteContract}
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default CreateEmployee;
