import React from 'react';
import { ListGroup } from 'react-bootstrap';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { useNavigate } from 'react-router-dom';

const CustomListGroup = ({ items }) => {
    const navigate = useNavigate();
    return (
        <div style={{ marginRight: '20px' }}> 
            <ListGroup style={{ width: '250px', marginTop: '10px' }}>
                {items.map((item, index) => (
                    <ListGroup.Item
                        key={index}
                        href={item.link}
                        style={{
                            textDecoration: 'none',
                            backgroundColor: 'gray',
                            color: 'white',
                            transition: 'background-color 0.2s',
                            cursor: 'pointer',
                        }}
                        className="list-group-item-gray"
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'green';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'gray';
                        }}
                        onClick={() => navigate(item.link)}
                    >
                        <NoteAltOutlinedIcon style={{ marginRight: '8px' }} />
                        {item.text}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default CustomListGroup;
