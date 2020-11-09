import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from "../Navbar/index";
import './styles.css'

const users = {'user': 'user', 'admin': 'admin'}


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '',};

    }

    handleChange(key,val){
        this.setState({
            [key]: val
        })
    }

    clickHandler = () =>{
        alert('Username is ' + this.state.username + '\nPassword is ' + this.state.password);
    }

    sumbit = () => {
        if (this.state.username in users) {
            alert('User exist');
            if (users[this.state.username] === this.state.password) {
                alert('Correct Password');
            } else {
                alert('Wrong Password');
            }
        } else {
            alert('No such a user');
        }
    }



    render() { 
        return (
        <div>
            <Navbar />
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" onChange={(v)=>this.handleChange('username',v.target.value)} className="form-control" placeholder="Enter username" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" onChange={(v)=>this.handleChange('password',v.target.value)} className="form-control" placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>
                        <button onClick={this.clickHandler}>check</button>
                        <button onClick={this.sumbit} className="btn btn-primary btn-block">Submit</button>
                        
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

// class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {username: '', password: '',};
    
//     }
//     render() {
//         return (
//             <div>
//                 <Formik
//                     initialValues={{ username: '', password: '' }}
//                     validate={values => {
//                     const errors = {};
//                     if (!values.username) {
//                         errors.username = 'Required';
//                     }
//                     return errors;
//                     }}
//                     onSubmit={(values, { setSubmitting }) => {
//                         setTimeout(() => {
//                         alert(JSON.stringify(values, null, 2));
//                         setSubmitting(false);
//                         }, 400);
//                     }}
//                 >
//                     {({
//                     values,
//                     errors,
//                     touched,
//                     handleChange,
//                     handleBlur,
//                     handleSubmit,
//                     isSubmitting,
//                     /* and other goodies */
//                     }) => (
//                     <form onSubmit={handleSubmit}>
//                         <input
//                         type="txt"
//                         name="username"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.username}
//                     />
//                         {errors.username && touched.username && errors.username}
//                         <input
//                         type="password"
//                         name="password"
//                         onChange={handleChange}
//                         onBlur={handleBlur}
//                         value={values.password}
//                         />
//                         {errors.password && touched.password && errors.password}
//                         <button type="submit" disabled={isSubmitting}>
//                         Submit
//                         </button>
//                     </form>
//                 )}
//                 </Formik>
//             </div>
//         )
//     }
// }
 
export default Login;