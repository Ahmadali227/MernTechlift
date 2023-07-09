import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Select, message, Table, DatePicker, Date } from 'antd'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import Spinner from '../components/Spinner'
import moment from 'moment';
import Analytics from '../components/Analytics'
const { RangePicker } = DatePicker;

const Homepage = () => {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [allTransection, setAllTransection] = useState([])
  const [frequency, setFrequency] = useState("7")
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType] = useState('all')
  const [viewData, setViewData] = useState('table')
  const [editable, setEditable] = useState(null)









  //data tables show
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>
    },

    {
      title: 'Amount',
      dataIndex: 'amount'
    },

    {
      title: 'Type',
      dataIndex: 'type'
    },

    {
      title: 'Category',
      dataIndex: 'category'
    },

    {
      title: 'Reference',
      dataIndex: 'refrence'
    },
    {
      title: 'Actions',
      render: (text, record) => (
        <div>
          <EditOutlined className='text-primary' onClick={()=>{
            setEditable(record)
            setShowModal(true)
          }} />
          <DeleteOutlined className='mx-2 text-danger' onClick={()=>{handleDelete(record)}} />
        </div>
      )

    }
  ]


  ///get all Transection
  useEffect(() => {

    const getAllTransections = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        setLoading(true);
        const res = await axios.post('/transections/get-transection', {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        })
        setLoading(false)
        setAllTransection(res.data)
        console.log(res.data)
      } catch (error) {
        console.log(error)
        message.error('Sorry, Fetch Transections issue ')
      }
    }
    getAllTransections();
  }, [frequency, selectedDate, type]);

/////////////delete Handle/////////
  const handleDelete=async(record)=>{
try {
  setLoading(true)
  await axios.post("/transections/delete-transection",{transactionId:record._id});
  setLoading(false)
  message.success('Trasection deleted successfully')
} catch (error) {
  setLoading(false);
console.log(error)
message.error('Unable to delete')
}
  }


///////////FORN HANDLE//////////
  const handleSubmit = async (values) => {
    console.log(values)
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      if(editable){
        await axios.post('/transections/edit-transection', {
          payload:{
            ...values,
            userId:user._id
          },
          transactionId:editable._id
        })
        setLoading(false)
        message.success('Transection Updated successfully')
      }else{
        await axios.post('/transections/add-transection', { ...values, userid: user._id })
      setLoading(false)
      message.success('Transection added successfully')
      }
      setShowModal(false)
      setEditable(null)
    } catch (error) {
      setLoading(false);
      message.error('Transection Failed')
    }
  }
  return (
    <Layout>
      {loading && <Spinner />}
      <div className="filters  mt-4 mb-4">
        <div>
          <h6 className='bold'>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 week</Select.Option>
            <Select.Option value="30">LAST 1 month</Select.Option>
            <Select.Option value="365">LAST 1 year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>

          </Select>

          {
            frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />
          }
        </div>

        {/* type */}
        <div >
          <h6 className='bold'>Select Type</h6>
          <Select  value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">Show All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>


          </Select>
        </div>

        <div className="switch-icons bg-white">

          <UnorderedListOutlined
            className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`}
            onClick={() => setViewData('table')} />
          <AreaChartOutlined
            className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`}
            onClick={() => setViewData('analytics')} />

        </div>

        <div>




          <button className='btn butn' onClick={() => setShowModal(true)}>Add Data</button>
        </div>
      </div>

      <div className="content container">

        {viewData === 'table' ?
          <Table columns={columns} dataSource={allTransection} />
          :
          <Analytics allTransection={allTransection} />
        }


        <Modal title={editable ? 'Edit Transections' : 'Add Transections'}
          open={showModal}
          onCancel={() => setShowModal(false)}
          footer={false}
        >
          <Form layout='vertical' onFinish={handleSubmit} initialValues={editable}>
            <Form.Item label='Amount' name='amount'>
              <Input type='text' />
            </Form.Item>

            <Form.Item label='Type' name='type'>
              <Select>
                <Select.Option value='income'>Income</Select.Option>
                <Select.Option value='expense'>Expense</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label='Category' name='category'>
              <Select>
                <Select.Option value='salary'>Salary</Select.Option>
                <Select.Option value='project'>Project</Select.Option>
                <Select.Option value='food'>Food</Select.Option>
                <Select.Option value='movie'>Movie</Select.Option>
                <Select.Option value='bills'>Bills</Select.Option>
                <Select.Option value='tax'>Tax</Select.Option>
                <Select.Option value='medical'>Medical</Select.Option>
                <Select.Option value='fee'>Fees</Select.Option>

              </Select>
            </Form.Item>

            <Form.Item label='Date' name='date'>
              <Input type='date' />
            </Form.Item>

            <Form.Item label='Reference' name='refrence'>
              <Input type='text' />
            </Form.Item>

            <Form.Item label='Description' name='description'>
              <Input type='text' />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button type='submit' className='btn btn-primary '>Save</button>
            </div>
          </Form>
        </Modal>
      </div>
    </Layout>
  )
}

export default Homepage
