import { Modal, Form, Input, Select, DatePicker, Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HIDE_CREATE_DIALOG } from "redux/home/action";
import { createBooking, getBookingTypes } from "redux/home/operation";
import {
  selectShowCreateDialog,
  selectBookingTypes,
  selectIsSaving,
} from "redux/home/selector";
import { Auth } from "utils";
const { Option } = Select;
const CreateBookingDialog = () => {
  const isShowCreateDialog = useSelector((state) =>
    selectShowCreateDialog(state)
  );
  const isSaving = useSelector((state) => selectIsSaving(state));
  const bookingTypes = useSelector((state) => selectBookingTypes(state));
  const dispatch = useDispatch();

  const handleCancel = useCallback(() => {
    dispatch({ type: HIDE_CREATE_DIALOG });
  }, [dispatch]);

  useEffect(() => {
    if (isShowCreateDialog) dispatch(getBookingTypes());
  }, [dispatch, isShowCreateDialog]);

  const [formValue, setFormValue] = useState({
    type: null,
    location: null,
    date1: null,
    date2: null,
    date3: null,
  });

  const onValueChange = useCallback(
    (name, value) => {
      switch (name) {
        case "type":
          setFormValue({ ...formValue, type: value });
          break;
        case "location":
          setFormValue({ ...formValue, location: value });
          break;
        case "date1":
          setFormValue({ ...formValue, date1: value });
          break;
        case "date2":
          setFormValue({ ...formValue, date2: value });
          break;
        case "date3":
          setFormValue({ ...formValue, date3: value });
          break;
        default:
      }
    },
    [formValue]
  );

  const onFinish = () => {
    const saveValue = { ...formValue };
    saveValue.owner = Auth.getUserId();
    dispatch(createBooking(saveValue));
  };

  return (
    <>
      <Modal
        title="Create Booking"
        onCancel={handleCancel}
        visible={isShowCreateDialog}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Type is required!",
              },
            ]}
          >
            <Select onChange={(val) => onValueChange("type", val)}>
              {bookingTypes.map((e) => (
                <Option key={e._id} value={e._id}>
                  {e.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[
              {
                required: true,
                message: "Location is required!",
              },
            ]}
          >
            <Input
              onChange={(val) => onValueChange("location", val.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Date 1"
            name="date1"
            rules={[
              {
                required: true,
                message: "Date is required!",
              },
            ]}
          >
            <DatePicker
              showTime
              onChange={(val) => onValueChange("date1", val.toISOString())}
            />
          </Form.Item>

          <Form.Item
            label="Date 2"
            name="date2"
            rules={[
              {
                required: true,
                message: "Date2 is required!",
              },
            ]}
          >
            <DatePicker
              showTime
              onChange={(val) => onValueChange("date2", val.toISOString())}
            />
          </Form.Item>

          <Form.Item
            label="Date 3"
            name="date3"
            rules={[
              {
                required: true,
                message: "Date3 is required!",
              },
            ]}
          >
            <DatePicker
              showTime
              onChange={(val) => onValueChange("date3", val.toISOString())}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Button style={{ marginRight: 16 }} onClick={handleCancel}>
              Cancel
            </Button>
            <Button loading={isSaving} type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateBookingDialog;
