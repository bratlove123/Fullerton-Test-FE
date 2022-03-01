import { Input } from "antd";

const BaseInput = (props) => {
  const { className, ...rest } = props;
  const customClassName = `base-input ${className}`;
  return <Input {...rest} className={customClassName} />;
};

export default BaseInput;
