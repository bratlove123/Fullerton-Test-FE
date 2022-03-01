import { Form, Row, Input, Button } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "redux/login/operation";
import { selectIsLoading, selectLoginSuccess } from "redux/login/selector";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const isLoading = useSelector((state) => selectIsLoading(state));
  const loginSuccess = useSelector((state) => selectLoginSuccess(state));
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    if (loginSuccess) window.location.reload();
  }, [loginSuccess, history]);

  const onFinish = (values) => {
    dispatch(login(values));
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              len: 8,
              message: "At least 8 characters!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button loading={isLoading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default Login;
