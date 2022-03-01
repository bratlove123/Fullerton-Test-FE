import {
  Table,
  Space,
  Row,
  Button,
  Modal,
  Form,
  Input,
  Tag,
  Checkbox,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SHOW_CREATE_DIALOG } from "redux/home/action";
import { format } from "date-fns";
import {
  cancelBooking,
  changeStatus,
  getAllBookings,
  getUserBookings,
} from "redux/home/operation";
import { selectIsLoading, selectBookings } from "redux/home/selector";
import { Auth } from "utils";
import CreateBookingDialog from "./CreateBookingDialog";
const Home = () => {
  const isLoading = useSelector((state) => selectIsLoading(state));
  const bookings = useSelector((state) => selectBookings(state));
  const dispatch = useDispatch();
  const [isShowCancel, setIsShowCancel] = useState(false);
  const [cancelId, setCancelId] = useState(null);
  const [reject, setReject] = useState({
    id: null,
    reason: null,
    isShowReject: false,
  });
  const [approve, setApprove] = useState({
    id: null,
    date1: null,
    date2: null,
    date3: null,
    date1Confirmed: false,
    date2Confirmed: false,
    date3Confirmed: false,
    isShowApprove: false,
  });

  useEffect(() => {
    if (Auth.isAdmin()) {
      dispatch(getAllBookings());
    } else {
      dispatch(getUserBookings());
    }
  }, [dispatch]);

  const cancel = useCallback(() => {
    setIsShowCancel(false);
    dispatch(cancelBooking({ id: cancelId }));
  }, [cancelId, dispatch]);

  const onClickCancel = useCallback((id) => {
    setIsShowCancel(true);
    setCancelId(id);
  }, []);

  const onChangeReason = useCallback(
    (value) => {
      setReject({ ...reject, reason: value });
    },
    [reject]
  );

  const onChangeDate = useCallback(
    (name, value) => {
      switch (name) {
        case "date1":
          setApprove({ ...approve, date1Confirmed: value });
          break;
        case "date2":
          setApprove({ ...approve, date2Confirmed: value });
          break;
        case "date3":
          setApprove({ ...approve, date3Confirmed: value });
          break;
        default:
      }
    },
    [approve]
  );

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => type?.name,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Date 1",
      dataIndex: "date1",
      key: "date1",
      render: (date, record) =>
        date ? (
          <span style={{ color: record.date1Confirmed ? "green" : "black" }}>
            {format(new Date(date), "MM/dd/yyyy hh:mm")}
          </span>
        ) : (
          ""
        ),
    },
    {
      title: "Date 2",
      dataIndex: "date2",
      key: "date2",
      render: (date, record) =>
        date ? (
          <span style={{ color: record.date2Confirmed ? "green" : "black" }}>
            {format(new Date(date), "MM/dd/yyyy hh:mm")}
          </span>
        ) : (
          ""
        ),
    },
    {
      title: "Date 3",
      dataIndex: "date3",
      key: "date3",
      render: (date, record) =>
        date ? (
          <span style={{ color: record.date3Confirmed ? "green" : "black" }}>
            {format(new Date(date), "MM/dd/yyyy hh:mm")}
          </span>
        ) : (
          ""
        ),
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      render: (owner) => owner?.username,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "Pending Review")
          return <Tag color="blue">{status}</Tag>;
        if (status === "Rejected") return <Tag color="red">{status}</Tag>;
        if (status === "Approved") return <Tag color="green">{status}</Tag>;
        if (status === "Cancelled") return <Tag color="purple">{status}</Tag>;
      },
    },
    {
      title: "Action",
      render: (owner, data) => {
        if (data.status === "Pending Review") {
          if (Auth.isAdmin()) {
            return (
              <Row>
                <Button
                  onClick={() =>
                    setApprove({
                      isShowApprove: true,
                      id: data._id,
                      date1: data.date1,
                      date2: data.date2,
                      date3: data.date3,
                    })
                  }
                  style={{ marginRight: 16 }}
                  type="primary"
                >
                  Approve
                </Button>
                <Button
                  onClick={() =>
                    setReject({ isShowReject: true, id: data._id })
                  }
                  danger
                >
                  Reject
                </Button>
              </Row>
            );
          } else {
            return (
              <Button danger onClick={() => onClickCancel(data._id)}>
                Cancel
              </Button>
            );
          }
        } else {
          return "";
        }
      },
    },
  ];

  const showCreateDialog = useCallback(() => {
    dispatch({ type: SHOW_CREATE_DIALOG });
  }, [dispatch]);

  const onReject = useCallback(() => {
    setReject({ isShowReject: false });
    dispatch(
      changeStatus({
        status: "Rejected",
        reason: reject.reason,
        _id: reject.id,
      })
    );
  }, [dispatch, reject.id, reject.reason]);

  const onApprove = useCallback(() => {
    setApprove({ ...approve, isShowApprove: false });
    dispatch(
      changeStatus({
        status: "Approved",
        date1Confirmed: approve.date1Confirmed,
        date2Confirmed: approve.date2Confirmed,
        date3Confirmed: approve.date3Confirmed,
        _id: approve.id,
      })
    );
  }, [approve, dispatch]);

  return (
    <>
      {!Auth.isAdmin() && (
        <Space style={{ marginBottom: 16, marginLeft: 16 }}>
          <Button onClick={showCreateDialog}>Create Booking</Button>
        </Space>
      )}
      <Table loading={isLoading} dataSource={bookings} columns={columns} />
      <CreateBookingDialog />
      <Modal
        visible={isShowCancel}
        onOk={() => cancel()}
        onCancel={() => setIsShowCancel(false)}
      >
        <p>Warning</p>
        <div className="text-center">Are you sure to cancel this booking?</div>
      </Modal>
      <Modal
        visible={reject.isShowReject}
        footer={null}
        onCancel={() => setReject({ isShowReject: false })}
      >
        <p>Reject</p>
        <div className="text-center" style={{ paddingBottom: 20 }}>
          Please input reason to reject this booking?
        </div>
        <Form name="basic" onFinish={onReject} autoComplete="off">
          <Form.Item
            label="Reason"
            name="reason"
            rules={[
              {
                required: true,
                message: "Reason is required!",
              },
            ]}
          >
            <Input
              value={reject.reason}
              onChange={(val) => onChangeReason(val.target.value)}
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button danger htmlType="submit">
              Reject
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={approve.isShowApprove}
        footer={null}
        onCancel={() => setApprove({ ...approve, isShowApprove: false })}
      >
        <p>Approve</p>
        <div className="text-center" style={{ paddingBottom: 20 }}>
          Please select approve date?
        </div>
        <Form name="basic" onFinish={onApprove} autoComplete="off">
          <Row>
            <Checkbox onChange={(e) => onChangeDate("date1", e.target.checked)}>
              {format(new Date(approve.date1), "MM/dd/yyyy hh:mm")}
            </Checkbox>
            <Checkbox onChange={(e) => onChangeDate("date2", e.target.checked)}>
              {format(new Date(approve.date2), "MM/dd/yyyy hh:mm")}
            </Checkbox>
            <Checkbox onChange={(e) => onChangeDate("date3", e.target.checked)}>
              {format(new Date(approve.date3), "MM/dd/yyyy hh:mm")}
            </Checkbox>
          </Row>
          <Form.Item style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Approve
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Home;
