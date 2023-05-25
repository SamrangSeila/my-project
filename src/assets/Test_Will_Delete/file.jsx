
import { useEffect, useState } from 'react';
import { Button, Modal, Space,Table,Input, message, Popconfirm  } from 'antd';
import './TabbleCat.css'
import axios from 'axios';
import { DeleteFilled, EditFilled } from '@ant-design/icons';


const tableCategories = () => {
    const [title,setTitle] = useState('');
    const [image,setImage] = useState(null);
    // const [categories,setCategories] = useState('');
    const [icon,setIcon] = useState('');
    const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data,setData] = useState([])
  const [category,setCategory] = useState(null)
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const handlerImage = (e) => {
    setImage(e.target.files[0]);
  }

  const list = {
    title:title,
    icon:icon,
    image:image
  }

//   const handlerCreate = () => {
//     console.log(list)
//   }
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };


    // start clear data from textfield 

  const clearForm = () => {
    setTitle(''),
    setIcon('')
    setCategory(null)
  }


  // start using fetch data from api

  const fetchData = async () => {
    axios.get(`http://192.168.100.16:8000/api/v1/category`)
    .then((res) => {
        setData(res.data.data)
        console.log(res.data)
    })
  }


  /// start deletedata by using parameter id
  const deleteData = async (id) => {
    axios.delete(`http://192.168.100.16:8000/api/v1/category/${id}`)
    .then((res) => {
        clearForm()
        message.success(res.data.message)
        fetchData()
    })
  }


  /// start edit data 
  const editData = async (item,key) => {
    setTitle(item.title)
    setIcon(item.icon)
    setCategory(item.id)
    setImage(item.images.url)
    setOpen(true)
  }
  useEffect(() => {
    fetchData()
    
  },[])

   /// end edit data 


   // start insert into database
  const insert = async () => {


    /// start we use condition for replace data that already have and then it will be insert later

    if(category == null){
        var formData = new FormData();
        formData.append('title',title)
        formData.append('icon',icon)
        formData.append('image',image)
        axios.post(`http://192.168.100.16:8000/api/v1/category`,formData)
        .then((res) => {
            if(res){
                setOpen(false)
                clearForm()
                message.success(res.data.message)
                fetchData()
            }
        })
    }

     /// end we use condition for replace data that already have and then it will be insert later

    else{
       
        ///   start for update cateogories
        axios.put(`http://192.168.100.16:8000/api/v1/category/${category}`,list)
        .then((res) => {
            if(res){
                setOpen(false)
                clearForm()
                message.success(res.data.message)
                fetchData()
            }
        })
        // end for update categories
    }
  }
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
     {/* start uing table*/}
     <div>
     <div
     style={{
       marginBottom: 16,
     }}
   >
    <div className='flex justify-between items-center'>
    <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
    Reload
  </Button>
       {/* buttom for add categories*/}  <button className='create-categories' style={{backgroundColor:"red",padding:2 ,borderRadius:4,color:"white",fontSize:15,}} type="primary" onClick={() => setOpen(true)} >Add New</button>
    </div>
     <span
       style={{
         marginLeft: 8,
       }}
     >
       {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
     </span>
   </div>
   <Table  
   columns={[
    {
        title: 'Title',
        dataIndex: 'title',
      },
      {
        title: 'Icon',
        dataIndex: 'icon',
      },
      {
        title: 'images',
        dataIndex: 'images',
        render: (item,key) => {
           return (
            <div>
            <img
                src={item?.images?.url}
                width={40}
                height={40}
            />
            </div>
           )
        }
      },

      {
        title: "Action",
        render: (_, record, index) => (
          <Space>
            <Popconfirm
              placement="topRight"
              title={"Delete"}
              description={"Are sure to remove this customer"}
              // onConfirm={() => onConfirmDelete(record.customer_id)}
              onConfirm={() => deleteData(record.id)}
              okText="Delete"
              cancelText="No"
            >
              <Button danger={true} size="small">
                <DeleteFilled />
              </Button>
            </Popconfirm>

            <Button
              size="small"
              type="primary"
              onClick={() => editData(record,index)}
            >
              <EditFilled />
            </Button>
          </Space>
        ),
      },
   ]} 
   dataSource={data} /><button>Delete</button>
    
   <Modal
     title="Enter your Categories name here"
     centered
     open={open}
     onOk={() => setOpen(false)}
     onCancel={() => setOpen(false)}
     width={500}
     footer={null}
   >
   <Input
   value={title}
   onChange={(e)=> setTitle(e.target.value)}
    placeholder="categories name" />
    <Input
    value={icon}
    onChange={(e)=> setIcon(e.target.value)}
     placeholder="categories name" />
     <Input type='file' onChange={handlerImage}/>
     <Button 
     onClick={insert}
     type='pirmary'>Submit</Button>
   </Modal>
     </div>
      {/* end using model*/}
    </div>
  );
};
export default tableCategories;