import React, {Component} from 'react';
import Container from './Container';
import Footer from './Footer';
import './App.css';
import { getAllStudents } from './client'; // we want to import our function
import AddStudentForm from './forms/AddStudentForm';
import { render } from '@testing-library/react';
import { ErrorNotification, errorNotification } from './Notification';
import {
  Table,
  Avatar,
  Spin,
  Icon,
  Modal,
  Empty
} from 'antd';
class App extends Component {
//
  state = {
    students: [],
    isFetching: false, // spiner is false by default
    isAddStudentModalVisible: false
  }
 
  componentDidMount (){
    this.fetchStudents();
  }

  openAddStudentModal = () => this.setState({isAddStudentModalVisible: true})
  closeAddStudentModal = () => this.setState({isAddStudentModalVisible: false})


  fetchStudents = () =>{
    this.setState({isFetching: true // in order to turn on spiner
    });
    getAllStudents()
    .then(res => res.json()
    .then(students => {
      // takes the response and grabs the json inside of it
      console.log(students);
      this.setState({
        students,
        isFetching: false //in order to turn off spiner
      });

    }))
    .catch(error => {
      console.log(error.error);
      const message  = error.error.message
      const description = error.error.error
      errorNotification(message,description);
      this.setState({
        isFetching: false
      });
    });
  
  }

  render(){
  
    const getIndicatorIcon =() => <Icon type="loading" style={{ fontSize: 24 }} spin />;

    const { students,isFetching ,isAddStudentModalVisible} = this.state;

    const commonElements = () => (
      <div>
         <Modal
            title='Add new student'
            visible={this.state.isAddStudentModalVisible}
            onOk={this.closeAddStudentModal}
            onCancel={this.closeAddStudentModal}
            width={1000}>
            <AddStudentForm
              onSuccess={() => {
                this.closeAddStudentModal();
                this.fetchStudents();
              }}
            />
            </Modal>
            <Footer
             numberOfStudents={students.length}
             handleAddStudentClickEvent={this.openAddStudentModal}/>
      </div>
    )

    if (isFetching){
      return (
        <Container>
          <Spin indicator={getIndicatorIcon}/>
        </Container>
      );
    }

    if (students && students.length){

      const columns = [
        {
          title: '',
          key: 'avatar',
          render: (text ,student) => (
            <Avatar size='large' style={{ color: '#ffffff', backgroundColor: '#87d068' }}>
              {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
            </Avatar>
             
            // to take the fist letter of first and last name and add it to the avatar
          )
        },
        {
          title: 'Student Id',
          dataIndex: 'studentId',
          key: 'studentId',
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName',
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lasttName',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Gender',
          dataIndex: 'gender',
          key: 'gender',
        }

      ];

      return (
        <Container>
          <Table
              style={{marginBottom: '100px'}}
              dataSource={students}
              columns={columns}
              pagination={false} // to remove the next button inside table
              rowKey='studentId'/>
              {commonElements()}
        </Container>
      );

  }
    
  return(
    <Container>
     <Empty description={
      <h1>No Students Found</h1>
    }/>
    {commonElements()}
    </Container>
  )
  }
}

export default App;
