import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IData {
  name: string;
  id: number;
  staff_id: string;
  gender: string;
  card_number: string;
  bank_account_no: string;
  family_card_number: string;
  marriage_code: string;
  mother_name: string;
  pob: string;
  dob: string;
  home_address_1: string;
  home_address_2: string;
  nc_id: string;
  contract_start_date: string;
  contracts: Array<any>;
  department_name: string;
  type: string;
  basic_salary: string;
  position_name: string;
  entitle_ot: string,
  meal_allowance_paid: string;
  meal_allowance: string;
  grade_name: string;
}

interface IDatas {
  Employee: IData[];
  // EmployeeByID: any;
  InforUser: any;
  InforPagination: IPagination;
  isLoading: boolean;
}

interface IPagination {
  Pages: number | undefined;
  TotalEmployee: number | undefined;
  From: number | undefined;
  To: number | undefined;
}

const initialState: IDatas = {
  isLoading: false,
  Employee: [],
  // EmployeeByID: {},
  InforUser: {},
  InforPagination: {
    Pages: undefined,
    TotalEmployee: undefined,
    From: undefined,
    To: undefined,
  },
};

export const fetchInforUser = createAsyncThunk(
  "data/fetchInforUser",
  async () => {
    const response = await fetch(
      "https://api-training.hrm.div4.pgtest.co/api/v1/user/detail",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
      }
    );
    const result = await response.json();
    return result.data;
  }
);

export const fetchDataEmployee = createAsyncThunk(
  "data/fetchDataEmployee",
  async (params: { page: number; search?: string }, { dispatch }) => {
    dispatch(toggleLoading(true))
    const { page, search } = params;
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
    const result = await response.json();
    dispatch(toggleLoading(false));
    return result.data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    toggleLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInforUser.fulfilled, (state, action) => {
        state.InforUser = action.payload;
      })
      .addCase(fetchDataEmployee.fulfilled, (state, action) => {
        state.Employee = action.payload.data;
        state.InforPagination.Pages = action.payload.last_page;
        state.InforPagination.TotalEmployee = action.payload.total;
        state.InforPagination.From = action.payload.from;
        state.InforPagination.To = action.payload.to;
      });
  },
});

export const { toggleLoading} = dataSlice.actions;

const { reducer } = dataSlice;

export default reducer;


