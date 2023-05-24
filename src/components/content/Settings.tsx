import React from "react";
import { Box, Divider, Typography } from "@mui/material";

const Settings: React.FC = () => {
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
      </Box>
    </>
  );
};

export default Settings;
