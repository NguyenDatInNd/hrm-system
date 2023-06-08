import React from "react";
import { Box, Divider, Typography, Button } from "@mui/material";
import { Form, Input, Spin, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/lib/form";

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const formRef = React.useRef<FormInstance>(null);
  const [loading, setLoading] = React.useState(false);
  const [api, contextHolder] = notification.useNotification();
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api-training.hrm.div4.pgtest.co/api/v1/change-password",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        }
      );
      const result = await response.json();
      if (result.result === "true") {
        openNotification(result.message);
        formRef.current && formRef.current.resetFields();
      } else {
        openNotification(result.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openNotification = (message: string) => {
    api.open({
      message: "",
      description: message,
      icon:
        message === "Success" ? (
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
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginTop: "5px" }}
          >
            <path
              d="M10.29 3.85999L1.82002 18C1.64539 18.3024 1.55299 18.6453 1.55201 18.9945C1.55103 19.3437 1.64151 19.6871 1.81445 19.9905C1.98738 20.2939 2.23675 20.5467 2.53773 20.7238C2.83871 20.9009 3.18082 20.9962 3.53002 21H20.47C20.8192 20.9962 21.1613 20.9009 21.4623 20.7238C21.7633 20.5467 22.0127 20.2939 22.1856 19.9905C22.3585 19.6871 22.449 19.3437 22.448 18.9945C22.4471 18.6453 22.3547 18.3024 22.18 18L13.71 3.85999C13.5318 3.5661 13.2807 3.32311 12.9812 3.15447C12.6817 2.98584 12.3438 2.89725 12 2.89725C11.6563 2.89725 11.3184 2.98584 11.0188 3.15447C10.7193 3.32311 10.4683 3.5661 10.29 3.85999V3.85999Z"
              stroke="#E5484D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12 9V13"
              stroke="#E5484D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12 17H12.01"
              stroke="#E5484D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        ),
      style: {
        color: message === "Success" ? "#12a594" : "#E5484D",
        fontWeight: 600,
        background: message === "Success" ? "#d9f3ee" : "#FFEFEF",
      },
    });
  };
  return (
    <>
      {contextHolder}
      <Typography
        sx={{ fontSize: "36px", margin: "10px 0", fontWeight: "600" }}
      >
        Settings
      </Typography>

      <Box className="content-tabpanel">
        <Typography sx={{ fontWeight: "500", fontSize: "24px" }}>
          Change Password
        </Typography>
        <Divider />
        <Form
          form={form}
          ref={formRef}
          layout="vertical"
          name="register"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter password",
              },
            ]}
          >
            <Input.Password className="pw1" />
          </Form.Item>
          <Form.Item
            name="password_confirmation"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please enter confirm password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password className="pw1" />
          </Form.Item>
          <Form.Item>
            <Button
              className="button-submit-pw"
              type="submit"
              variant="contained"
            >
              {loading ? (
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: 24, color: "#ccc" }}
                      spin
                    />
                  }
                />
              ) : (
                "Confirm"
              )}
            </Button>
          </Form.Item>
        </Form>
      </Box>
    </>
  );
};

export default Settings;
