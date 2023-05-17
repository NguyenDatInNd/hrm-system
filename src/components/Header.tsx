import React from "react";
import styled from "styled-components";
import label_HRM from "../css/img/label_HRM.svg";
import { Modal, ConfigProvider, Dropdown, Spin } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Button, Avatar, Typography, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

const ImgVN = () => {
  return (
    <img width="20" height="10" src={`https://flagcdn.com/w20/vn.png`} alt="" />
  );
};

const ImgEN = () => {
  return (
    <img width="20" height="10" src={`https://flagcdn.com/w20/gb.png`} alt="" />
  );
};

const items: MenuProps["items"] = [
  {
    key: "EN",
    label: (
      <div>
        <ImgEN />
        <span style={{ marginLeft: "5px", fontSize: "12px" }}>EN</span>
      </div>
    ),
  },
  {
    key: "VN",
    label: (
      <div>
        <ImgVN />
        <span style={{ marginLeft: "5px", fontSize: "12px" }}>VN</span>
      </div>
    ),
  },
];

const antIcon = (
  <LoadingOutlined style={{ fontSize: 24, color: "#ccc" }} spin />
);

const ModalSignOutStyled = styled(Modal)`
  :where(.css-dev-only-do-not-override-yp8pcc).ant-modal .ant-modal-close {
    top: 26px;
    color: black;
  }
  :where(.css-dev-only-do-not-override-yp8pcc).ant-modal .ant-modal-title {
    font-size: 22px;
    font-weight: 600;
    margin: 0 0 25px;
  }
  :where(.css-dev-only-do-not-override-yp8pcc).ant-modal .ant-modal-footer {
    display: flex;
    justify-content: space-between;
  }
  button {
    width: 147px;
    height: 48px;
    border: none;
  }
  .ant-btn-default {
    background-color: #f1f3f5;
  }
  .ant-btn-default:hover {
    color: black;
  }
  .ant-btn-primary:active {
    background-color: #f1f3f5;
  }
`;

const ModalInforUserStyled = styled(Modal)`
  :where(.css-dev-only-do-not-override-dhhteq).ant-modal .ant-modal-footer {
    display: none;
  }
  :where(.css-dev-only-do-not-override-yp8pcc).ant-modal-root .ant-modal-mask {
    background-color: red;
  }
  :where(.css-dev-only-do-not-override-dhhteq).ant-modal .ant-modal-close {
    display: none;
  }
`;

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 60px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 3px 15px #eceef0;
  position: fixed;
  top: 0;
  z-index: 2;
`;

const ContentStyled = styled.div`
  display: flex;
  font-family: "SVN-Sofia Pro";
  align-items: center;
  p {
    width: 271px;
    height: 33px;
    font-size: 23px;
    line-height: 33px;
    color: #11181c;
    margin: 0;
  }
  img {
    width: 36px;
    height: 36px;
  }
`;

const language = ["EN", "VN"];

const HeaderContent: React.FC = () => {
  const [lang, setLang] = React.useState<string>(language[0]);
  const [openModalInforUser, setOpenModalInforUser] =
    React.useState<boolean>(false);
  const [openModalSignOut, setOpenModalSignOut] =
    React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const hideModal = () => {
    setOpenModalSignOut(false);
  };
  const handleClickOpen = () => {
    setOpenModalSignOut(true);
  };
  const inforUser = useSelector((state: RootState) => state.InforUser);

  const onClick: MenuProps["onClick"] = ({ key }) => {
    setLang(key);
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api-training.hrm.div4.pgtest.co/api/v1/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        }
      );
      const result = await response.json();
      if (result.message === "Success") {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeaderStyled>
      <ContentStyled>
        <img src={label_HRM} alt="" />
        <p>HR Management System</p>
      </ContentStyled>
      <div style={{ display: "flex" }}>
        <Dropdown
          trigger={["click"]}
          menu={{
            items,
            onClick,
          }}
        >
          <Button
            sx={{
              width: 88,
              height: 32,
              border: "none",
              background: "#f1f3f5",
              padding: 0,
              marginRight: "10px",
              textTransform: "capitalize",
              color: "black",
            }}
          >
            {lang === "EN" ? (
              <div style={{ display: "inline-block", paddingRight: 15 }}>
                <ImgEN />
                <span style={{ marginLeft: "5px", fontSize: "12px" }}>EN</span>
              </div>
            ) : (
              <div style={{ display: "inline-block", paddingRight: 15 }}>
                <ImgVN />
                <span style={{ marginLeft: "5px", fontSize: "12px" }}>VN</span>
              </div>
            )}
            <DownOutlined />
          </Button>
        </Dropdown>
        {
          inforUser && 
        <Avatar
          onClick={() => setOpenModalInforUser(true)}
          sx={{
            background: "rgb(230, 232, 235)",
            fontSize: 20,
            cursor: "pointer",
            width: 32,
            height: 32,
            position: "relative",
          }}
        >
          {inforUser?.username?.charAt(0)}
        </Avatar>
        }
        <ConfigProvider
          theme={{
            components: {
              Modal: {
                colorBgMask: "#fff0",
              },
            },
          }}
        >
          <ModalInforUserStyled
            style={{ top: 55, left: "36%" }}
            open={openModalInforUser}
            onOk={() => setOpenModalInforUser(false)}
            onCancel={() => setOpenModalInforUser(false)}
            width={312}
          >
            <Stack spacing={2}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  sx={{
                    background: "rgb(230, 232, 235)",
                    fontSize: 20,
                    cursor: "pointer",
                    width: 32,
                    height: 32,
                  }}
                  aria-label="recipe"
                >
                  {inforUser?.username?.charAt(0)}
                </Avatar>
                <Typography
                  sx={{
                    margin: "0px 0px 0px 10px",
                    fontFamily:
                      '"SVN-Sofia Pro Medium", "Public Sans", sans-serif',
                    fontWeight: "500",
                    lineHeight: "1.375",
                    fontSize: "24px",
                    letterSpacing: "-0.03em",
                    flexShrink: "0",
                  }}
                >
                  {inforUser?.username}
                </Typography>
              </div>
              <Typography>{inforUser?.department?.name}</Typography>
              <Typography>Staff ID: </Typography>
              <Button
                sx={{
                  height: 48,
                  textTransform: "capitalize",
                  background: "rgb(0, 145, 255)",
                  fontWeight: "500",
                }}
                variant="contained"
                onClick={handleClickOpen}
              >
                Sign Out
              </Button>
              <Link
                onClick={(e) => setOpenModalInforUser(false)}
                to={"/Settings"}
              >
                Reset Password
              </Link>
            </Stack>
          </ModalInforUserStyled>
        </ConfigProvider>
      </div>
      <ModalSignOutStyled
        title="Do you wish to sign out?"
        centered
        open={openModalSignOut}
        onOk={handleSignOut}
        onCancel={hideModal}
        okText={loading ? <Spin indicator={antIcon} /> : "Yes"}
        cancelText="No"
        width={352}
      ></ModalSignOutStyled>
    </HeaderStyled>
  );
};

export default HeaderContent;
