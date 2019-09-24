import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//Material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import NotifIcon from '@material-ui/icons/Notifications';
import themeFile from '../util/theme';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = themeFile;
class NavBar extends Component {
    render() {
        const { authenticated } = this.props;
        const { classes } = this.props;

        return (
            <div>
                <AppBar>
                    <Toolbar className="nav-container">
                        {authenticated ? (
                            <Fragment>
                                <IconButton className={classes.button}>
                                    <AddIcon titleAccess="Create a new post" />
                                </IconButton>
                                <Link to="/">
                                    <IconButton className={classes.button}>
                                        <HomeIcon titleAccess="Home" />
                                    </IconButton>
                                </Link>

                                <IconButton className={classes.button}>
                                    <NotifIcon titleAccess="Noticications"></NotifIcon>
                                </IconButton>
                            </Fragment>
                        ) :
                            (
                                <Fragment>
                                    <Button color="inherit" component={Link} to="/">Home</Button>
                                    <Button color="inherit" component={Link} to="/login">Login</Button>
                                    <Button color="inherit" component={Link} to="/signup">Sign-up</Button>
                                </Fragment>
                            )}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}
NavBar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}
const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(withStyles(styles)(NavBar))
