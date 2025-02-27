import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

import themeFile from '../util/theme';
import AppIcon from '../images/BHSlogo.png';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

const styles = themeFile;

export class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
            errors: {}
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors });
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            name: this.state.name
        }
        this.props.signupUser(newUserData, this.props.history);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.formContainer}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} class="App-logo" alt="App logo" title="Consult Brian" />
                    <Typography variant="h3" className={classes.pageTitle} title="Login">Sign-up</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="name"
                            name="name"
                            type="text"
                            label="Name"
                            className={classes.textField}
                            helperText={errors.name}
                            error={errors.name ? true : false}
                            value={this.state.name}
                            onChange={this.handleChange}
                            fullWidth>
                        </TextField>
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
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword}
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
                            Create Account
                            {loading && (
                                <CircularProgress size={25} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <br />
                        <small>
                            already have an account ? <Link to="/login">login</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}
signup.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})


export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup))
