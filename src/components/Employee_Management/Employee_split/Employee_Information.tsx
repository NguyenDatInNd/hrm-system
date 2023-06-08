import React from "react";
import {
  Box,
  Divider,
  FormControl,
  Grid,
  OutlinedInput,
  Typography,
} from "@mui/material";
import {
  DateSelect,
  IconRequired,
  InputLayout,
  SelectLayout,
} from "../Components";
import { genderOptions, marriageStatusOptions } from "../Options_Select";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/store";
import { setStateInformationErr } from "../../../redux/reducer";

interface EmployeeManagementProps {
  dataEmployeeId: any;
  inputValue: any;
  handleInputChange: Function;
  dateOfBirth: any;
  setDateOfBirth: Function;
  dobErr: any;
  setDobErr: Function;
  stateErrText: any;
  setStateErrText: Function;
  stateErr: any;
  setStateErr: Function;
}

const Employee_Information: React.FC<EmployeeManagementProps> = (props) => {
  const {
    dataEmployeeId,
    inputValue,
    handleInputChange,
    dateOfBirth,
    setDateOfBirth,
    dobErr,
    setDobErr,
    stateErrText,
    setStateErrText,
    stateErr,
    setStateErr,
  } = props;

  const { index } = useParams();
  const dispatch = useAppDispatch();

  const informationErr =
    stateErrText.name ||
    stateErrText.gender ||
    stateErrText.ktp_no ||
    stateErrText.nc_id ||
    !dobErr;

  React.useEffect(() => {
    dispatch(setStateInformationErr(informationErr));
  }, [informationErr]);

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
                  value={dataEmployeeId?.staff_id}
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
              index ? dataEmployeeId?.mobile_number : inputValue.mobile_number
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
    </>
  );
};
export default Employee_Information;
