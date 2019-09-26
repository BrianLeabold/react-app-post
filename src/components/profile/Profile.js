import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';

// Redux
import { connect } from 'react-redux';
import { logoutUser, changeImage } from '../../redux/actions/userActions';
//Styling
import themeFile from '../../util/theme';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';

//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

const styles = themeFile;
class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.changeImage(formData);
    }
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageUpload');
        fileInput.click();
    };
    handleLogOut = () => {
        this.props.logoutUser();
    };
    render() {
        const { classes,
            user: {
                credentials: { name, createdAt, imageUrl, bio, website, location },
                loading, authenticated } } = this.props;
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="Profile" className="profile-image" />
                        <input type="file" id="imageUpload" hidden="hidden" onChange={this.handleImageChange} />
                        <IconButton onClick={this.handleEditPicture} className="button">
                            <EditIcon titleAccess="Chage your profile photo" color="primary" />
                        </IconButton>
                    </div>
                    <hr />
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${name}`} color="secondary" variant="h5">
                            @{name}
                        </MuiLink>
                        <hr />
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr />
                        {location && (
                            <Fragment>
                                <LocationOn color="primary" /><span>{location}</span>
                                <hr />
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary" />
                                <a href={website} title="Link to my website" target="_blank" rel="noopener noreferrer" >
                                    {'  '} {website}
                                </a>
                                <hr />
                            </Fragment>
                        )}
                        <CalendarToday color="primary" />{'   '}
                        <span>joined: {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <hr />
                    <IconButton onClick={this.handleLogOut} className="button" variant="contained" color="primary">
                        <KeyboardReturn titleAccess="logout" />
                    </IconButton><span>logout</span>
                    <EditDetails titleAccess="Edit your profile" /><span>edit profile</span>
                </div>
            </Paper>
        ) : (
                //Not Authenticated
                <Paper className={classes.paper}>
                    <Typography variant="body2" align="center" >
                        No profile found, please login
                </Typography>
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">login</Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">sign-up</Button>
                    </div>
                </Paper>
            )) : (<h3>loading...</h3>)

        return profileMarkup;
    }
}
const mapStateToProps = (state) => ({
    user: state.user
})
const mapActionsToProps = {
    logoutUser, changeImage
}
Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    changeImage: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))
