import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export function convertNumbersToStrings(
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
  entitle_ot: string;
  meal_allowance_paid: string;
  meal_allowance: string;
  grade_name: string;
}

interface IDatas {
  Employee: IData[];
  InforUser: any;
  InforEmployee: any;
  InforPagination: IPagination;
  isLoading: boolean;
  TabErr: any;
  MessageCreateEmployee: string;
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
  InforUser: {},
  InforEmployee: {},
  InforPagination: {
    Pages: undefined,
    TotalEmployee: undefined,
    From: undefined,
    To: undefined,
  },
  MessageCreateEmployee: "",
  TabErr: {
    informationErr: false,
    contactErr: true,
    SalaryErr: false,
  },
};

export const fetchCreateEmployee = createAsyncThunk(
  "data/fetchCreateEmployee",
  async (
    params: { data: any; dataContract?: any; dataOther?: any },
    { dispatch }
  ) => {
    const response = await fetch(
      "https://api-training.hrm.div4.pgtest.co/api/v1/employee",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        body: JSON.stringify(params.data),
      }
    );

    const result = await response.json();
    const idNewEmployee = result.data.id;
    {
      params.dataContract.length > 0 &&
        dispatch(
          fetchUploadFileContract({
            index: idNewEmployee,
            dataContract: params.dataContract,
          })
        );
    }
    {
      params.dataOther.length > 0 &&
        dispatch(
          fetchUploadFileOther({
            index: idNewEmployee,
            dataOther: params.dataOther,
          })
        );
    }
    return result.message;
  }
);

export const fetchUpdateEmployee = createAsyncThunk(
  "data/fetchUpdateEmployee",
  async (
    params: { data: any; dataContract?: any; dataOther?: any },
    { dispatch }
  ) => {
    const response = await fetch(
      `https://api-training.hrm.div4.pgtest.co/api/v1/employee/${params.data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        body: JSON.stringify(params.data),
      }
    );

    const result = await response.json();
      
    {
      params.dataContract.length > 0 &&
        dispatch(
          fetchUploadFileContract({
            index: params.data.id,
            dataContract: params.dataContract,
          })
        );
    }
    console.log(params.dataOther);
    {
      params.dataOther.length > 0 &&
        dispatch(
          fetchUploadFileOther({
            index: params.data.id,
            dataOther: params.dataOther,
          })
        );
    }
    return result.message;
  }
);

export const fetchDeleteEmployee = createAsyncThunk(
  "data/fetchDeleteEmployee",
  async (data: any) => {
    const response = await fetch(
      "https://api-training.hrm.div4.pgtest.co/api/v1/employee/multiple-delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        body: JSON.stringify({ record_ids: data }),
      }
    );
  }
);

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

export const fetchInforEmployee = createAsyncThunk(
  "data/fetchInforEmployee",
  async (id: any, { dispatch }) => {
    const response = await fetch(
      `https://api-training.hrm.div4.pgtest.co/api/v1/employee/${id}`,
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

export const fetchUploadFileContract = createAsyncThunk(
  "data/fetchUploadFileContract",
  async (params: { index: any; dataContract: any }) => {
    const formData = new FormData();
    formData.append("employee_id", String(params.index));
    params.dataContract
      .filter((data: any) => data.contract_file)
      .map((data: any) => {
        formData.append("names[]", data.contract_name);
        formData.append("documents[]", data.contract_file);
        formData.append("contract_dates[]", data.contract_date);
        formData.append("modified_contracts[]", "");
      });

    const response = await fetch(
      "https://api-training.hrm.div4.pgtest.co/api/v1/contract/save-multiple",
      {
        headers: {
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();
    return result.data;
  }
);

export const fetchUploadFileOther = createAsyncThunk(
  "data/fetchUploadFileOther",
  async (params: { index: any; dataOther: any }) => {
    const formData = new FormData();
    formData.append("employee_id", String(params.index));
    params.dataOther
      .filter((data: any) => data.otherFile_file)
      .map((data: any) => {
        formData.append("documents[]", data.otherFile_file);
      });

    const response = await fetch(
      "https://api-training.hrm.div4.pgtest.co/api/v1/employee-document/upload",
      {
        headers: {
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();
    return result.data;
  }
);
export const fetchDataEmployee = createAsyncThunk(
  "data/fetchDataEmployee",
  async (params: { page: number; search?: string }, { dispatch }) => {
    dispatch(toggleLoading(true));
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
    setStateInformationErr: (state, action: PayloadAction<boolean>) => {
      state.TabErr.informationErr = action.payload;
    },
    setStateSalaryErr: (state, action: PayloadAction<boolean>) => {
      state.TabErr.SalaryErr = action.payload;
    },
    setStateContactErr: (state, action: PayloadAction<boolean>) => {
      state.TabErr.contactErr = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInforUser.fulfilled, (state, action) => {
        state.InforUser = action.payload;
      })
      .addCase(fetchInforEmployee.fulfilled, (state, action) => {
        state.InforEmployee = action.payload;
      })
      .addCase(fetchCreateEmployee.fulfilled, (state, action) => {
        state.MessageCreateEmployee = action.payload;
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

export const {
  toggleLoading,
  setStateInformationErr,
  setStateSalaryErr,
  setStateContactErr,
} = dataSlice.actions;

const { reducer } = dataSlice;

export default reducer;
