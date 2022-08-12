import React, {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';



function EditStudent(props) {

    const history = useNavigate();
    const [loading, setLoading] = useState(true);
    const [studentInput, setStudent] = useState([]);
    const [error_list, setError] = useState([]);
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        
     //   const student_id = props.match.params.id;
        axios.get(`http://localhost:8000/api/edit-student/${id}`).then( res => {

            if(res.data.status === 200)
            {
                setStudent(res.data.student);
                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/students');
            }
        });

    }, [history]);

    const handleInput = (e) => {
        e.persist();
        setStudent({...studentInput, [e.target.name]: e.target.value });
    }

    const updateStudent = (e) => {
        e.preventDefault();
        
       // const student_id = props.match.params.id;
        // const data = studentInput;
        const data = {
            name: studentInput.name,
            course: studentInput.course,
            email: studentInput.email,
            phone: studentInput.phone,
        }

        axios.put(`http://localhost:8000/api/update-student/${id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                setError([]);
                history.push('/students');
            }
            else if(res.data.status === 422)
            {
                swal("All fields are mandetory","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                history.push('/');
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Edit Student Data...</h4>
    }
    
    return (
        <div>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Students 
                                    <Link to={'/'} className="btn btn-danger btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <form onSubmit={updateStudent} >
                                    <div className="form-group mb-3">
                                        <label>Student Name</label>
                                        <input type="text" name="name" onChange={handleInput} value={studentInput.name} className="form-control" />
                                        <span className="text-danger">{ error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Course</label>
                                        <input type="text" name="course" onChange={handleInput} value={studentInput.course}  className="form-control" />
                                        <span className="text-danger">{ error_list.course}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Email</label>
                                        <input type="text" name="email" onChange={handleInput} value={studentInput.email}  className="form-control" />
                                        <span className="text-danger">{ error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Phone</label>
                                        <input type="text" name="phone" onChange={handleInput} value={studentInput.phone}  className="form-control" />
                                        <span className="text-danger">{ error_list.phone}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="updatebtn" className="btn btn-primary">Update Student</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default EditStudent;