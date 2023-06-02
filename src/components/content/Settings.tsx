import React from "react";
import { Box, Divider, Typography, Button } from "@mui/material";
import { Form, Input } from "antd";

const Settings: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
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
            name="confirm"
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
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </Box>
    </>
  );
};

export default Settings;
