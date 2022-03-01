import { PageHeader, Button, Tag } from "antd";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "redux/global/selector";
import { Auth } from "utils";

const Header = () => {
  const userInfo = useSelector((state) => selectUserInfo(state));

  const logout = useCallback(() => {
    Auth.clearToken();
    window.location.reload();
  }, []);

  return (
    <PageHeader
      className="site-page-header"
      title="Fullerton"
      subTitle="Booking App"
      extra={[
        <>
          <span
            style={{
              marginRight: 3,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {userInfo?.username}
          </span>
          <Tag color="geekblue"> {userInfo?.role[0]}</Tag>
        </>,
        <Button onClick={logout}>Logout</Button>,
      ]}
    />
  );
};

export default Header;
