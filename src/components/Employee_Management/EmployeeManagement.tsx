import React from "react";
import { Divider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import iconAdd from "../../css/img/iconAdd.svg";
import iconDeleteActive from "../../css/img/iconDelete.svg";
import iconDeleteDisable from "../../css/img/icon_delete_active.svg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  Typography,
} from "@mui/material";
import { fetchDataEmployee, fetchDeleteEmployee } from "../../redux/reducer";
import { useNavigate } from "react-router-dom";

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

const EmployeeManagement: React.FC = () => {
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [search, setSearch] = React.useState<string>("");
  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const rows = useSelector((state: RootState) => state.Employee);
  const isLoading = useSelector((state: RootState) => state.isLoading);
  const { Pages, TotalEmployee, From, To } = useSelector(
    (state: RootState) => state.InforPagination
  );

  const headCells = [
    {
      id: "staff_id",
      label: "NIK",
    },
    {
      id: "name",
      label: "Name",
    },
    {
      id: "gender",
      label: "Gender",
      type: "number",
      render: (value: any) => (value === 0 ? "Male" : "Female"),
    },
    {
      id: "card_number",
      label: "Bank Card No.",
    },
    {
      id: "bank_account_no",
      label: "Bank Account No.",
    },
    {
      id: "family_card_number",
      label: "Family Card No.",
    },
    {
      id: "marriage_code",
      label: "Marriage Status",
    },
    {
      id: "mother_name",
      label: "Mother Name",
    },
    {
      id: "pob",
      label: "Place of birth",
    },
    {
      id: "dob",
      label: "Date of birth",
    },
    {
      id: "home_address_1",
      label: "Home Address",
    },
    {
      id: "home_address_2",
      label: "Home Address",
    },
    {
      id: "nc_id",
      label: "National Card ID No.",
    },
    {
      id: "contract_start_date",
      label: "Date Start",
    },
    {
      id: "contracts[0].contract_date",
      label: "First",
    },
    {
      id: "contracts[1].contract_date",
      label: "Second",
    },
    {
      id: "contracts[2].contract_date",
      label: "End",
    },
    {
      id: "department_name",
      label: "Department",
    },
    {
      id: "type",
      label: "Employee Type",
    },
    {
      id: "basic_salary",
      label: "Salary Rp.",
    },
    {
      id: "position_name",
      label: "Position",
    },
    {
      id: "entitle_ot",
      label: "O/T Paid",
      type: "number",
      render: (value: any) => (value === 0 ? "" : "Yes"),
    },
    {
      id: "meal_allowance_paid",
      label: "Meal paid",
      type: "number",
      render: (value: any) => (value === 0 ? "" : "Yes"),
    },
    {
      id: "meal_allowance",
      label: "Meal Rp.",
    },
    {
      id: "grade_name",
      label: "Grading",
    },
  ];
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteEmployee = () => {
    dispatch(fetchDeleteEmployee(selected));
    dispatch(fetchDataEmployee({ page: page, search: search }));
    setSelected([])
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDoubleClick = (e: number) => {
    navigate(`/employee/create-or-update/${e}`);
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value);
  };

  const debounceOnChange = debounce(onChangeSearch, 300);

  function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, numSelected, rowCount } = props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {headCells
            .filter((headCell) => headCell.id !== "home_address_2")
            .map((headCell) => (
              <TableCell
                sx={{ fontWeight: "bold" }}
                align="center"
                key={headCell.id}
                colSpan={headCell.id === "home_address_1" ? 2 : 1}
              >
                {headCell.label}
              </TableCell>
            ))}
        </TableRow>
      </TableHead>
    );
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangeValuEmployeeType = (value: string) => {
    if (value === "0") {
      return "Permanent";
    } else if (value === "1") {
      return "Part-time";
    } else if (value === "2") {
      return "Contract";
    }
  };

  React.useEffect(() => {
    dispatch(fetchDataEmployee({ page: page, search: search }));
  }, [dispatch, page, search]);

  return (
    <div style={{ marginTop: 10 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <span style={{ fontSize: 29, fontWeight: "bold" }}>
          Employee Management
        </span>
        <Input
          className="search-input"
          style={{ width: 200 }}
          size="large"
          placeholder="Search..."
          prefix={<SearchOutlined />}
          onChange={debounceOnChange}
        />
      </div>
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
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            className="button-add-styled"
            variant="contained"
            startIcon={<img src={iconAdd} alt="" />}
            onClick={() => navigate("/employee/create-or-update")}
          >
            Add
          </Button>
          <Button
            disabled={selected.length === 0}
            className={`button-delete-styled ${
              selected.length !== 0 ? "active" : ""
            }`}
            sx={{ textTransform: "capitalize" }}
            variant="contained"
            startIcon={
              selected.length !== 0 ? (
                <img src={iconDeleteActive} alt="" />
              ) : (
                <img src={iconDeleteDisable} alt="" />
              )
            }
            onClick={handleClickOpen}
          >
            Delete
          </Button>
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
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onDoubleClick={() => handleDoubleClick(row.id)}
                      onClick={(event) => handleClick(event, row.id)}
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
                        {handleChangeValuEmployeeType(row.type)}
                      </TableCell>
                      <TableCell align="center">{row.basic_salary}</TableCell>
                      <TableCell align="center">{row.position_name}</TableCell>
                      <TableCell align="center">
                        {headCells[21].render?.(row.entitle_ot)}
                      </TableCell>
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
            justifyContent: "flex-start",
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
            <Typography className="page-numbers">
              {From} - {To} of {TotalEmployee}
            </Typography>
          )}
        </div>
      </div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Delete <CloseIcon/></DialogTitle>
        <DialogContent>Are you sure you want to delete?</DialogContent>
        <DialogActions>
          <Button className="button-cancel" onClick={handleClose}>No</Button>
          <Button className="button-agree" onClick={handleDeleteEmployee} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeManagement;
