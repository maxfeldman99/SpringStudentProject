import React from 'react';
import Container from './Container';
import { Button, Avatar } from 'antd';
import './Footer.css';

// if its undefind make the avatar null , else we also consider 0 to be valid
const Footer = (props) =>(
    <div className='footer'>
       <Container>
            {props.numberOfStudents !== undefined ?
             <Avatar
                    style={{ color: '#ffffff', backgroundColor: '#87d068' , marginRight: '5px'}} 
                    size='large'>{props.numberOfStudents}</Avatar> :null
            }
            <Button onClick={() => props.handleAddStudentClickEvent()} type='primary'>Add new student +</Button>   
        </Container> 
    </div>
);

export default Footer;