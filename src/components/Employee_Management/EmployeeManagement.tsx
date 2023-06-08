import React, { useCallback, useEffect, useState } from "react";
import { Divider, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import iconAdd from "../../css/img/iconAdd.svg";
import iconDeleteActive from "../../css/img/iconDelete.svg";
import iconDeleteDisable from "../../css/img/icon_delete_active.svg";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IData } from "../../redux/reducer";

const EmployeeManagementTest: React.FC = () => {
  const ITEM_PER_PAGE = 20;
  const columns: GridColDef[] = [
    {
      field: "staff_id",
      headerName: "NIK",
      width: 130,
    },
    {
      field: "name",
      headerName: "Name",
      width: 130,
    },
    {
      field: "gender",
      headerName: "Gender",
      type: "number",
      width: 85,
      align: "left",
      renderCell: (value: any) => (value === 0 ? "Male" : "Female"),
    },
    {
      field: "card_number",
      width: 120,
      headerName: "Bank Card No.",
    },
    {
      field: "bank_account_no",
      headerName: "Bank Account No.",
      width: 145,
    },
    {
      field: "family_card_number",
      headerName: "Family Card No.",
      width: 140,
    },
    {
      field: "marriage_code",
      headerName: "Marriage Status",
      width: 135,
    },
    {
      field: "mother_name",
      headerName: "Mother Name",
      width: 115,
    },
    {
      field: "pob",
      headerName: "Place of birth",
      width: 135,
    },
    {
      field: "dob",
      headerName: "Date of birth",
      width: 130,
    },
    {
      field: "home_address_1",
      headerName: "Home Address",
      width: 125,
    },
    {
      field: "home_address_2",
      headerName: "Home Address",
    },
    {
      field: "nc_id",
      headerName: "National Card ID No.",
    },
    {
      field: "contract_start_date",
      headerName: "Date Start",
    },
    {
      field: "contracts[0].contract_date",
      headerName: "First",
    },
    {
      field: "contracts[1].contract_date",
      headerName: "Second",
    },
    {
      field: "contracts[2].contract_date",
      headerName: "End",
    },
    {
      field: "department_name",
      headerName: "Department",
    },
    {
      field: "type",
      headerName: "Employee Type",
      renderCell: (value: any) => handleChangeValuEmployeeType(value),
    },
    {
      field: "basic_salary",
      headerName: "Salary Rp.",
    },
    {
      field: "position_name",
      headerName: "Position",
    },
    {
      field: "entitle_ot",
      headerName: "O/T Paid",
      type: "number",
      renderCell: (value: any) => (value === 0 ? "" : "Yes"),
    },
    {
      field: "meal_allowance_paid",
      headerName: "Meal paid",
      type: "number",
      renderCell: (value: any) => (value === 0 ? "" : "Yes"),
    },
    {
      field: "meal_allowance",
      headerName: "Meal Rp.",
    },
    {
      field: "grade_name",
      headerName: "Grading",
    },
  ];

  const [dataTable, setDataTable] = useState<Array<IData>>([]);
  const [page, setPage] = React.useState<number>(1);
  const [search, setSearch] = React.useState<string>("");
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const getAllEmployee = useCallback(async () => {
    try {
      let url = "https://api-training.hrm.div4.pgtest.co/api/v1/employee";
      if (search) {
        url += `?search=${search}&page=${page}`;
      } else url += `?page=${page}`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
      });
      const jsonData = await response.json();
      setDataTable(jsonData.data.data);
      setNumberOfPages(Math.ceil(jsonData.data.total / ITEM_PER_PAGE));
    } catch (error) {}
  }, [page, search]);

  useEffect(() => {
    getAllEmployee();
  }, [getAllEmployee]);

  const [selected, setSelected] = React.useState<number[]>([]);

  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteEmployee = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api-training.hrm.div4.pgtest.co/api/v1/employee/multiple-delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
          body: JSON.stringify({ record_ids: selected }),
        }
      );
      if (response.ok) {
        getAllEmployee();
        setSelected([]);
        setOpen(false);
      }
    } catch (error) {
      alert("lỗi");
    }
  }, [getAllEmployee, selected]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e?.target?.value);
  };

  const debounceOnChange = debounce(onChangeSearch, 300);

  const handleChangeValuEmployeeType = (value: any) => {
    if (value.value === "0") {
      return "Permanent";
    } else if (value.value === "1") {
      return "Part-time";
    } else if (value.value === "2") {
      return "Contract";
    }
  };

  const handleRowDoubleClick = (params: any) => {
    navigate(`/employee/create-or-update/${params.id}`);
  };
  const handleSelectionChange = (selection: any) => {
    setSelected(selection);
  };

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
        <DataGrid
          rows={dataTable}
          sx={{
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },
            ".MuiDataGrid-columnHeader": {
              border: "1px solid white",
              backgroundColor: "rgb(236, 238, 240) !important",
            },
            ".MuiDataGrid-columnHeaderTitle": {
              fontWeight: "600 !important",
            },
            "&.MuiDataGrid-root": {
              border: "none",
            },
            ".MuiDataGrid-cell": {
              border: "1px solid white",
            },
          }}
          columns={columns}
          columnHeaderHeight={42}
          rowHeight={38}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: ITEM_PER_PAGE,
              },
            },
          }}
          checkboxSelection
          onRowSelectionModelChange={handleSelectionChange}
          onCellDoubleClick={handleRowDoubleClick}
          onCellClick={handleSelectionChange}
          disableRowSelectionOnClick
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Pagination
            count={numberOfPages}
            onChange={handleChange}
            page={page}
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </div>
      </div>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>
          Delete <CloseIcon />
        </DialogTitle>
        <DialogContent>Are you sure you want to delete?</DialogContent>
        <DialogActions>
          <Button className="button-cancel" onClick={handleClose}>
            No
          </Button>
          <Button
            className="button-agree"
            onClick={handleDeleteEmployee}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeManagementTest;
