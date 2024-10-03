import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input, Button, Tooltip, Table, Pagination, Form } from "antd";
import { F_DeleteIcon, F_DownloadExcelIcon, F_DownloadPdfIcon, F_EditIcon, F_EyeIcon, F_PlusIcon, F_PrintIcon } from "../../Icons";
import { BASE_URL } from '../../constanats';
import { notify } from '../../utils/localServiceUtil';
import { calculateEmi } from './caculateEmi';
import { callAPI } from '../../utils/api';
import { useSelector } from 'react-redux';

const Party = () => {
  const navigate = useNavigate();
  const [finalHeight, setFinalHeight] = useState("");
  const selectedCompany = useSelector((state) => state.files.selectedCompanyData)
  const [pageLimit, setPageLimit] = React.useState(20);
  const [totalPages, settotalPages] = React.useState(0);
  const [searchComp, setSearchComp] = useState("");
  const [inputTimeout, setInputTimeout] = useState(null);
  const [data, setData] = React.useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 20,
  })
  const [form] = Form.useForm();

  useEffect(() => {
    let mainLayoutHeader = document.getElementById("f_layout-content-header");
    let mainContentHeader = document.querySelector(".f_content-main-header");
    let paginationHeight = document.querySelector(".f_content-main-pagination");
    let mainHeight = mainLayoutHeader?.offsetHeight + mainContentHeader?.offsetHeight + paginationHeight?.offsetHeight;
    setFinalHeight(mainHeight);
  }, [window?.location?.pathname]);


  useEffect(() => {
    if (selectedCompany?._id) {
      setFilter({
        filter: {
          fileId: selectedCompany?._id
        },
        ...filter
      })
    }
  }, [selectedCompany])

  const fetchData = () => {
    const body = { ...filter }
    body.limit = pageLimit;
    callAPI("POST", `${BASE_URL}/user/party/paginate`, body)
      .then((res) => {
        setData(res.data.list);
        settotalPages(res?.data?.count)
      })
      .catch((err) => {
        notify("error", "Failed to fetch data", err.message);
      });
  }

  useEffect(() => {
    if (selectedCompany && filter?.filter) {
      fetchData();
    }
  }, [filter])

  const partyList = [
    {
      title: 'Sr. No.',
      id: "row",
      key: "row",
      dataIndex: 'key',
      width: "5%",
      render: (x, props, index) => (
        <span>{index + 1}</span>
      )
    },
    {
      title: 'House No.',
      dataIndex: 'houseNumber',
      id: 'houseNo',
      key: 'houseNo',
    },
    {
      title: 'Party Name',
      dataIndex: 'ownerName',
      id: 'ownerName',
      key: 'ownerName',
    },
    {
      title: 'Broker Name',
      dataIndex: 'brokerName',
      id: 'brokerName',
      key: 'brokerName',
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      id: 'payment',
      key: 'payment',
    },
    {
      title: 'Down Payment',
      dataIndex: 'downPayment',
      id: 'downPayment',
      key: 'downPayment',
    },
    {
      title: 'Remaining Payment',
      dataIndex: 'remainingAmount',
      id: 'remingPayment',
      key: 'remingPayment',
    },
    {
      title: 'Complete Payment',
      dataIndex: 'totalPaidAmount',
      id: 'completePayment',
      key: 'completePayment',
    },
    {
      id: "action",
      key: "action",
      width: "7%",
      title: <span>Action</span>,
      render: (x, props, index) => {
        return (
          <div className='f_flex f_align-center f_content-center'>
            <Tooltip placement="bottom" title={'Edit'}>
              <span className="f_cp f_icon-small-hover f_flex f_align-center f_content-center f_mr-5" onClick={() => navigate(`/party/view/${props?._id}`)}><F_EditIcon width='14px' height='14px' /></span>
            </Tooltip>
            <Tooltip placement="bottom" title={'Delete'}>
              <span className="f_cp f_icon-small-hover f_icon-small-hover-delete f_flex f_align-center f_content-center f_mr-5"><F_DeleteIcon width='14px' height='14px' /></span>
            </Tooltip>
            <Tooltip placement="bottom" title={'Print'}>
              <span className="f_cp f_icon-small-hover f_flex f_align-center f_content-center"><F_PrintIcon width='14px' height='14px' /></span>
            </Tooltip>
          </div>
        )
      }
    },
  ]

  const handleSearch = (search) => {
    setSearchComp(search);
    if (inputTimeout) clearTimeout(inputTimeout);
    setInputTimeout(
      setTimeout(() => {
        setFilter((prevFilter) => ({
          ...prevFilter,
          search: { keyboard: search, key: ['ownerName', 'houseNo'] },
        }));
      }, 1000)
    );
  };


  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  const handleChange = () => {
    const formValues = form.getFieldsValue();
    console.log(formValues);
    const data = calculateEmi(formValues);
    console.log("data", data);

    if (data) {
      form.setFieldsValue({ remainingAmount: data })
    }
  }

  return (
    <React.Fragment>
      <div className='f_content-main-header f_flex f_align-center f_content-between'>
        <div className="">
          <Input.Search
            allowClear
            className="f_layout-common-search"
            placeholder={"Search Party Name"}
            style={{ width: '200px' }}
            value={searchComp}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
        <div className="f_flex f_align-center f_content-center">
          <div className='f_ml-10'>
            <Tooltip title="Download PDF" placement='bottom'><span className='f_flex f_align-center f_content-center f_cp f_rollover-icon'><F_DownloadPdfIcon width='14px' height='14px' /></span></Tooltip>
          </div>
          <div className='f_ml-10'>
            <Tooltip title="Download Excel" placement='bottom'><span className='f_flex f_align-center f_content-center f_cp f_rollover-icon'><F_DownloadExcelIcon width='14px' height='14px' /></span></Tooltip>
          </div>
          <div className='f_ml-10'>
            <Button type="primary" className="f_flex f_align-center f_content-center" onClick={() => navigate('/party/create')}><F_PlusIcon width='12px' height='12px' fill='#fff' /> Add</Button>
          </div>
        </div>
      </div>

      <div className="f_content-main-inner" style={{ height: `calc(100vh - ${finalHeight}px)` }}>
        <Table columns={partyList}
          dataSource={data}
          pagination={false}
          className='f_listing-antd-table'
          rowSelection={rowSelection}
        />
      </div>

      <div className="f_content-main-pagination">
        <Pagination
          current={filter.page}
          total={totalPages}
          pageSize={pageLimit}
          showSizeChanger={true}
          onChange={(page) => setFilter({ ...filter, page: page })}
          onShowSizeChange={(a, size) => {
            setPageLimit(size)
          }
          }
        />
      </div>
    </React.Fragment >
  )
}

export default Party