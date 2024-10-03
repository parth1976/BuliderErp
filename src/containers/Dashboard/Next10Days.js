import React, { useEffect, useState } from 'react'
import { F_DownloadExcelIcon, F_DownloadPdfIcon, F_FilterIcon, F_RightArrowIcon } from '../../Icons'
import { Checkbox, Popover, Table, Tooltip } from 'antd'
import { callAPI } from '../../utils/api';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../constanats';
import { notify } from '../../utils/localServiceUtil';
import { useNavigate } from 'react-router-dom';
 
const Next10Days = () => {
    const [data, setData] = React.useState('');
    const selectedCompany = useSelector((state) => state.files.selectedCompanyData)
    const [filter, setFilter] = useState({
      page: 1,
      limit: 20,
    })
    const navigate = useNavigate();
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
      callAPI("POST", `${BASE_URL}/user/payment/paginate`, body)
        .then((res) => {
          setData(res.data.list);
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
  
    const handleFilterPopover = (data) => {
      const content = (
        <ul>
          <li className="f_flex f_align-center f_cp"><Checkbox>On-Time</Checkbox></li>
          <li className="f_flex f_align-center f_cp"><Checkbox>Advanced</Checkbox></li>
          <li className="f_flex f_align-center f_cp"><Checkbox>Overdue</Checkbox></li>
          <li className="f_flex f_align-center f_cp"><Checkbox>Pending</Checkbox></li>
          <li className="f_clear-filter f_cp">Clear</li>
        </ul>
      );
  
      return content;
    }

    const companyList = [
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
          dataIndex: 'partyId',
          id: 'houseNo',
          key: 'houseNo',
          render : (x) => x?.houseNumber
        },
        {
          title: 'Reminder Date',
          dataIndex: 'reminderDate',
          id: 'reminderDate',
          key: 'reminderDate',
        },
        {
          title: 'Party Name',
          dataIndex: 'partyId',
          id: 'ownerName',
          key: 'ownerName',
          render: (owner) => owner && owner?.ownerName || "-"
        },
        {
          title: 'Mobile No.',
          dataIndex: 'partyId',
          id: 'mobielNo',
          key: 'mobielNo',
          render: (owner) => owner && owner?.mobileNumber || "-"
        },
        // {
        //   title: 'Total Payment',
        //   dataIndex: 'partyId',
        //   id: 'totalPayment',
        //   key: 'totalPayment',
        //   render: (owner) => owner && owner?.payment || "-"
        // },
        // {
        //   title: 'Down Payment',
        //   dataIndex: 'partyId',
        //   id: 'downPayment',
        //   key: 'downPayment',
        //   render: (owner) => owner && owner?.downPayment || "-"
        // },
        {
          title: 'Collecting Payment',
          dataIndex: 'payment',
          id: 'collectingPayment',
          key: 'collectingPayment',
        },
        // {
        //   title: <div className='f_flex f_align-center f_content-center'><span>EMI Type</span></div>,
        //   dataIndex: 'emiType',
        //   className: 'f_text-center',
        //   id: 'emiType',
        //   key: 'emiType',
        //   render: (emiType) => {
        //     return emiType == 2 ? "Master" : "Regular";
        //   }
        // },
      ]

    return (
        <React.Fragment>
            <div className='f_dashboard-bg'>
                <div className='f_dashboard-header f_flex f_align-center f_content-between'>
                    <div className='f_flex f_align-center'>
                        <h6 className='f_mr-5'>Today's Remaining </h6>
                        {/* <Popover placement="bottom" overlayClassName="f_common-popover" content={handleFilterMonthPopover()} trigger="click">
                            <Tooltip title="Filter" placement='top'><span className='f_cp f_flex f_align-center f_content-center f_rollover-icon'><F_FilterIcon width='14px' height='14px' /></span></Tooltip>
                        </Popover> */}
                    </div>
                    <div className='f_flex f_align-center f_content-end'>
                        <div className='f_ml-10'>
                            <Tooltip title="Download PDF" placement='bottom'><span className='f_flex f_align-center f_content-center f_cp f_rollover-icon'><F_DownloadPdfIcon width='14px' height='14px' /></span></Tooltip>
                        </div>
                        <div className='f_ml-10'>
                            <Tooltip title="Download Excel" placement='bottom'><span className='f_flex f_align-center f_content-center f_cp f_rollover-icon'><F_DownloadExcelIcon width='14px' height='14px' /></span></Tooltip>
                        </div>
                        <div className='f_ml-10'>
                            <Tooltip title="View" placement='bottom'><span className='f_flex f_align-center f_content-center f_cp f_rollover-icon' onClick={() => navigate('/reminder')}><F_RightArrowIcon width='14px' height='14px' /></span></Tooltip>
                        </div>
                    </div>
                </div>
                <div className='f_dashboard-content'>
                    <Table columns={companyList}
                        dataSource={data}
                        pagination={false}
                        className='f_listing-antd-table'
                        summary={() => (
                            <Table.Summary fixed>
                                <Table.Summary.Row className='f_ant-table-summary-fixed'>
                                    <Table.Summary.Cell className="f_text-right f_fw-600" index={0} colSpan={5}>Total:</Table.Summary.Cell>
                                    <Table.Summary.Cell className="f_text-right f_fw-600" index={1}><span className='f_color-primary-500 '>₹ 10,000</span></Table.Summary.Cell>
                                </Table.Summary.Row>
                            </Table.Summary>
                        )}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Next10Days