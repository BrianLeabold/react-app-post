import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

//Styling
import themeFile from '../../util/theme';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
//import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const styles = themeFile;

class EditDetails extends Component {
    state = {
        bio: '',
        location: '',
        website: '',
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials)

    }
    handleClose = () => {
        this.setState({ open: false });
    };
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            location: this.state.location,
            website: this.state.website
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();

    };
    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            location: credentials.location ? credentials.location : '',
            website: credentials.website ? credentials.website : '',
        });
    };
    render() {

        const { classes } = this.props;
        return (
            <Fragment>
                <IconButton className={classes.button} onClick={this.handleOpen}>
                    <EditIcon titleAccess="Edit your profile" color="primary" />
                </IconButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <DialogTitle>Edit your profile</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name="bio" type="text" label="Bio" multiline rows="3"
                                placeholder="What you want people to know about you"
                                className={classes.textField} value={this.state.bio}
                                onChange={this.handleChange} fullWidth
                            />
                            <TextField name="location" type="text" label="Location"
                                placeholder="Your city"
                                className={classes.textField} value={this.state.location}
                                onChange={this.handleChange} fullWidth
                            />
                            <TextField name="website" type="text" label="Website"
                                placeholder="Your personal/proffesional website"
                                className={classes.textField} value={this.state.website}
                                onChange={this.handleChange} fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">Cancel</Button>
                        <Button onClick={this.handleSubmit} className={classes.editButton} color="primary">Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}



const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
})

EditDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired

}
export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails))
