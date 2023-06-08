import React, { ChangeEvent } from "react";
import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DateSelect, IconRequired, SelectLayout } from "../Components";
import { employeeTypeOptions } from "../Options_Select";
import IconUploadFile from "../../../css/img/icon_upload_file.svg";
import iconDeleteActive from "../../../css/img/iconDelete.svg";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/store";
import { setStateContactErr } from "../../../redux/reducer";

interface EmployeeManagementProps {
  dataEmployeeId: any;
  inputValue: any;
  handleInputChange: Function;
  startDate: any;
  setStartDate: Function;
  contractDate: any;
  setContractDate: Function;
}

const Employee_Contact: React.FC<EmployeeManagementProps> = (props) => {
  const {
    dataEmployeeId,
    inputValue,
    handleInputChange,
    setContractDate,
    setStartDate,
    startDate,
    contractDate,
  } = props;
  const dispatch = useAppDispatch();
  const { index } = useParams();
  const [indexFile, setIndexFile] = React.useState<any>();
  const [open, setOpen] = React.useState(false);
  const [startDateErr, setStartDateErr] = React.useState(true);
  const [contractData, setContractData] = React.useState<Array<any>>([]);
  const [selectedFileContract, setSelectedFileContract] =
    React.useState<File | null>(null);
  const [stateErrText, setStateErrText] = React.useState({
    type: true,
    contract_start_date: false,
  });

  const [stateErr, setStateErr] = React.useState({ type: false });
  const contactErr = stateErrText.type || !startDateErr;
console.log(stateErrText)
  React.useEffect(() => {
    dispatch(setStateContactErr(contactErr));
  }, [contactErr]);

  const handleAddFileContract = () => {
    const newData = {
      contract_name: inputValue.contract_name,
      contract_date: inputValue.contract_dates,
      contract_file: selectedFileContract,
    };
    setContractData((prevData) => [...prevData, newData]);
    setSelectedFileContract(null);
    setContractDate(null);
  };

  const handleFileChangeContract = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    setSelectedFileContract(selectedFile || null);
  };

  const handleDeleteFile = () => {
    setSelectedFileContract(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleValidate = (name: string, err: boolean) => {
    setStateErr({
      ...stateErr,
      [name]: err,
    });
  };

  const handleValidateText = (name: string, err: boolean) => {
    setStateErrText({
      ...stateErrText,
      [name]: err,
    });
  };

  return (
    <>
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
          <Box
            className="contract-information-select"
            sx={{ maxWidth: "350px" }}
          >
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
                <img style={{ paddingRight: 5 }} src={IconUploadFile} alt="" />
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
                    onClick={handleDeleteFile}
                  >
                    X
                  </button>
                </div>
              )}
            </Box>
          </Box>

          <Divider orientation="vertical" flexItem></Divider>
          <Box sx={{ width: "100%", maxHeight: "300px", overflowX: "hidden" }}>
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
                  contractData.map((row, index) => {
                    return (
                      <TableRow className="row-contract" key={index}>
                        <TableCell
                          className="row-contract"
                          sx={{ textAlign: "center" }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          className="row-contract"
                          sx={{ textAlign: "center", width: "150px" }}
                        >
                          {row.contract_name}
                        </TableCell>
                        <TableCell
                          className="row-contract"
                          sx={{ textAlign: "center", width: "150px" }}
                        >
                          {row.contract_date}
                        </TableCell>
                        <TableCell className="row-contract">
                          <Chip
                            className="delete-contract"
                            icon={<img src={iconDeleteActive} alt="" />}
                            label="Delete"
                            onClick={() => {
                              handleClickOpen();
                              setIndexFile(index);
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
    </>
  );
};
export default Employee_Contact;
