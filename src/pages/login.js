import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import axios from 'axios';

import AppIcon from '../images/logo192.png';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import themeFile from '../util/theme';

const styles = themeFile;

export class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', userData)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('cbIdToken', `Bearer ${res.data.token}`);
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                });
            });
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() {
        const {
            classes
        } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container className={classes.formContainer}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} className={classes.appIcon} alt="My React App" title="My React App" />
                    <Typography variant="h2" className={classes.pageTitle} title="Login">Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth>
                        </TextField>
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained"
                            color="primary" className={classes.submitButton}
                            disabled={loading}>
                            Login
                            {loading && (
                                <CircularProgress size={25} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <br />
                        <small>
                            dont have an account ? sign up <Link to="/signup">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}
login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)
