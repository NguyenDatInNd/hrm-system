import React from "react";
import styled from "styled-components";
import label_HRM from "../css/img/label_HRM.svg";
import { Avatar, Select, Space } from "antd";
const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 60px;
  width:100%;
  background: #ffffff;
  box-shadow: 0px 3px 15px #eceef0;
  position: fixed;
  top: 0;
  z-index: 1;
`;

const ContentStyled = styled.div`
  display: flex;
  font-family: "SVN-Sofia Pro";
  p {
    width: 271px;
    height: 33px;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
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

  const handleLanguageChange = (value: string) => {
    setLang(value);
  };

  const provinceData = [
    {
      label: (
        <div>
          <img width="20" src={`https://flagcdn.com/w20/gb.png`} alt="" />
          <span style={{ marginLeft: "5px" }}>EN</span>
        </div>
      ),
      value: "EN",
    },
    {
      label: (
        <div>
          <img width="20" src={`https://flagcdn.com/w20/vn.png`} alt="" />
          <span style={{ marginLeft: "5px" }}>VN</span>
        </div>
      ),
      value: "VN",
    },
  ];
  return (
    <HeaderStyled>
      <ContentStyled>
        <img src={label_HRM} alt="" />
        <p>HR Management System</p>
      </ContentStyled>
      <div>
        <Space wrap>
          <Select
            defaultValue={lang}
            style={{ width: 100 }}
            optionLabelProp="label"
            options={provinceData.map((province) => ({
              label: province.label,
              value: province.value,
            }))}
            onChange={(e) => handleLanguageChange(e)}
          />
        </Space>
        <Avatar>User</Avatar>
      </div>
    </HeaderStyled>
  );
};

export default HeaderContent;
