import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { Button, Tabs } from "antd";
import { Tab } from "@mui/material";

const UpdateEmployee: React.FC = () => {
  const { index } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  return (
    <>
       <div style={{ marginTop: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 29, fontWeight: "bold" }}>
          Employee Management
        </span>
        <Button style={{width:141, height:48}} type="primary">Save Change</Button>
      </div>

      {/* <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
    <Tab label="Item One" {...a11yProps(0)} />
    <Tab label="Item Two" {...a11yProps(1)} />
    <Tab label="Item Three" {...a11yProps(2)} />
  </Tabs>
  <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
      <div
        style={{
          padding: 10,
          height: "100%",
          margin: "20px 0",
          background: "#FBFCFD",
          boxShadow: "rgb(241, 243, 245) 0px 5px 20px",
          borderRadius: 12,
        }}
      >

        {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonAddStyled icon={<img src={iconAdd} alt="" />}>
            Add
          </ButtonAddStyled>
          <ButtonDeleteStyled
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="svg-fill-all"
                style={{ fill: "rgb(193, 200, 205)" }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                ></path>
              </svg>
            }
          >
            Delete
          </ButtonDeleteStyled>
        </div>

        <Divider />

        <TableContainer sx={{ height: 525 }}>
          <Table stickyHeader aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={rows.length}
            />
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              ) : rows.length !== 0 ? (
                rows.map((row, index) => {
                  const isItemSelected = isSelected(row.staff_id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onDoubleClick={() => handleDoubleClick(row.id)}
                      onClick={(event) => handleClick(event, row.staff_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        align="center"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.staff_id}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">
                        {headCells[2].render?.(row.gender)}
                      </TableCell>
                      <TableCell align="center">{row.card_number}</TableCell>
                      <TableCell align="center">
                        {row.bank_account_no}
                      </TableCell>
                      <TableCell align="center">
                        {row.family_card_number}
                      </TableCell>
                      <TableCell align="center">{row.marriage_code}</TableCell>
                      <TableCell align="center">{row.mother_name}</TableCell>
                      <TableCell align="center">{row.pob}</TableCell>
                      <TableCell align="center">{row.dob}</TableCell>
                      <TableCell align="center">{row.home_address_1}</TableCell>
                      <TableCell align="center">{row.home_address_2}</TableCell>
                      <TableCell align="center">{row.nc_id}</TableCell>
                      <TableCell align="center">
                        {row.contract_start_date}
                      </TableCell>
                      <TableCell align="center">
                        {row.contracts[0]?.contract_date}
                      </TableCell>
                      <TableCell align="center">
                        {row.contracts[1]?.contract_date}
                      </TableCell>
                      <TableCell align="center">
                        {row.contracts[2]?.contract_date}
                      </TableCell>
                      <TableCell align="center">
                        {row.department_name}
                      </TableCell>
                      <TableCell align="center">
                        {headCells[18].render?.(row.type)}
                      </TableCell>
                      <TableCell align="center">{row.basic_salary}</TableCell>
                      <TableCell align="center">{row.position_name}</TableCell>
                      <TableCell align="center">{headCells[21].render?.(row.entitle_ot)}</TableCell>
                      <TableCell align="center">
                        {headCells[22].render?.(row.meal_allowance_paid)}
                      </TableCell>
                      <TableCell align="center">{row.meal_allowance}</TableCell>
                      <TableCell align="center">{row.grade_name}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell>
                    <>
                      <svg
                        width="113"
                        height="114"
                        viewBox="0 0 113 114"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="56"
                          cy="55.5"
                          r="55.5"
                          fill="#6350FF"
                          fillOpacity="0.1"
                        ></circle>
                        <rect
                          x="29.3599"
                          y="34.4102"
                          width="56.98"
                          height="42.92"
                          rx="2"
                          fill="#6E56CF"
                        ></rect>
                        <rect
                          x="34.9097"
                          y="49.9492"
                          width="37.74"
                          height="2.22"
                          rx="1"
                          fill="white"
                          fillOpacity="0.2"
                        ></rect>
                        <path
                          d="M20.1099 50.9305C20.1099 49.8104 20.1099 49.2503 20.3279 48.8225C20.5196 48.4462 20.8256 48.1402 21.2019 47.9485C21.6297 47.7305 22.1898 47.7305 23.3099 47.7305H47.161C47.7691 47.7305 48.0731 47.7305 48.3505 47.8124C48.5961 47.885 48.8255 48.004 49.0262 48.1631C49.2529 48.3428 49.4278 48.5914 49.7778 49.0886L55.0439 56.5704C55.3939 57.0677 55.5689 57.3163 55.7955 57.4959C55.9963 57.655 56.2256 57.7741 56.4713 57.8466C56.7487 57.9286 57.0527 57.9286 57.6607 57.9286H88.6899C89.81 57.9286 90.37 57.9286 90.7978 58.1466C91.1742 58.3383 91.4801 58.6443 91.6719 59.0206C91.8899 59.4484 91.8899 60.0085 91.8899 61.1286V98.9205C91.8899 100.041 91.8899 100.601 91.6719 101.028C91.4801 101.405 91.1742 101.711 90.7978 101.902C90.37 102.12 89.81 102.12 88.6899 102.12H23.3099C22.1898 102.12 21.6297 102.12 21.2019 101.902C20.8256 101.711 20.5196 101.405 20.3279 101.028C20.1099 100.601 20.1099 100.041 20.1099 98.9205V50.9305Z"
                          fill="#F7CE00"
                        ></path>
                        <rect
                          x="57.48"
                          y="93.6094"
                          width="24.42"
                          height="2.96"
                          rx="1"
                          fill="white"
                        ></rect>
                        <rect
                          x="34.9097"
                          y="37.3691"
                          width="45.14"
                          height="2.96"
                          rx="1"
                          fill="white"
                          fillOpacity="0.2"
                        ></rect>
                        <rect
                          x="34.9097"
                          y="43.2891"
                          width="24.42"
                          height="1.48"
                          rx="0.74"
                          fill="white"
                          fillOpacity="0.2"
                        ></rect>
                        <rect
                          x="83.3799"
                          y="93.6094"
                          width="2.96"
                          height="2.96"
                          rx="1"
                          fill="white"
                        ></rect>
                        <circle
                          cx="5.6802"
                          cy="92.8706"
                          r="1.48"
                          fill="#F7CE00"
                        ></circle>
                        <circle
                          cx="78.5698"
                          cy="112.48"
                          r="1.48"
                          fill="#6E56CF"
                        ></circle>
                        <circle
                          cx="106.32"
                          cy="94.7206"
                          r="3.33"
                          fill="#F7CE00"
                        ></circle>
                        <circle
                          cx="5.6801"
                          cy="21.0898"
                          r="3.33"
                          fill="#6E56CF"
                        ></circle>
                        <circle
                          cx="91.8899"
                          cy="70.3001"
                          r="2.22"
                          fill="#6E56CF"
                        ></circle>
                        <g filter="url(#filter0_d_5951_39835)">
                          <circle
                            cx="96.3299"
                            cy="17.7605"
                            r="12.95"
                            fill="#6E56CF"
                          ></circle>
                          <path
                            d="M95.5781 22.5462C96.8068 22.5459 98.0001 22.1346 98.968 21.3777L102.011 24.4207L102.99 23.4419L99.9469 20.3989C100.704 19.431 101.116 18.2374 101.116 17.0084C101.116 13.9551 98.6316 11.4707 95.5781 11.4707C92.5245 11.4707 90.04 13.9551 90.04 17.0084C90.04 20.0618 92.5245 22.5462 95.5781 22.5462ZM95.5781 12.8551C97.8687 12.8551 99.7316 14.7179 99.7316 17.0084C99.7316 19.299 97.8687 21.1617 95.5781 21.1617C93.2874 21.1617 91.4245 19.299 91.4245 17.0084C91.4245 14.7179 93.2874 12.8551 95.5781 12.8551Z"
                            fill="white"
                          ></path>
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_5951_39835"
                            x="76.3799"
                            y="3.81055"
                            width="35.8999"
                            height="35.9004"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            ></feFlood>
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            ></feColorMatrix>
                            <feOffset dx="-2" dy="4"></feOffset>
                            <feGaussianBlur stdDeviation="2.5"></feGaussianBlur>
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0.388235 0 0 0 0 0.313726 0 0 0 0 1 0 0 0 0.25 0"
                            ></feColorMatrix>
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_5951_39835"
                            ></feBlend>
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_5951_39835"
                              result="shape"
                            ></feBlend>
                          </filter>
                        </defs>
                      </svg>
                      <h1>No Data</h1>
                      <p>Your record will be synced here once it ready</p>
                    </>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pagination
            count={Pages}
            onChange={handleChange}
            page={page}
            shape="rounded"
            showFirstButton
            showLastButton
          />
          {TotalEmployee && (
            <Typography>
              {From} - {To} of {TotalEmployee}
            </Typography>
          )}
        </div> */}
      </div>
    </div>
    </>
  );
};

export default UpdateEmployee;
