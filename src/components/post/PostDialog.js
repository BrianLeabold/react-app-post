import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import themeFile from '../../util/theme';
//import MyButton from '../../util/MyButton';
import Button from '@material-ui/core/Button';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
//import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Redux stuff
import { connect } from 'react-redux';
import { getPost, clearErrors } from '../../redux/actions/dataActions';

const styles = themeFile;

class PostDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    };
    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userName, postId } = this.props;
        const newPath = `/users/${userName}/post/${postId}`;

        if (oldPath === newPath) oldPath = `/users/${userName}`;

        window.history.pushState(null, null, newPath);

        this.setState({ open: true, oldPath, newPath });
        this.props.getPost(this.props.postId);
    };
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
    };

    render() {
        const {
            classes,
            post: {
                postId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userName,
                comments
            },
            UI: { loading }
        } = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={100} thickness={1} />
            </div>
        ) : (
                <Grid container spacing={1}>
                    <Grid item sm={4}>
                        <img src={userImage} alt="Profile" className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={8}>
                        <Typography
                            component={Link}
                            color="primary"
                            variant="h5"
                            to={`/users/${userName}`}
                        >{userName}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator} />
                        <Typography variant="body1">{body}</Typography>
                        <Button>
                            <ChatIcon color="primary" />
                        </Button>
                        <span>{commentCount} comments</span>
                        <LikeButton postId={postId} />
                        <span>{likeCount} likes</span>
                    </Grid>
                    <hr className={classes.visibleSeparator} />
                    <Comments comments={comments} />
                    <CommentForm postId={postId} />
                </Grid>
            );
        return (
            <Fragment>
                <Button
                    onClick={this.handleOpen}

                    className={classes.expandButton}
                >
                    <ExpandMoreIcon color="primary" />
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <Button
                        onClick={this.handleClose}
                        className={classes.dialogCloseButton}
                    >
                        <CloseIcon />
                    </Button>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

PostDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getPost: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    post: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.data.post,
    UI: state.UI
});

const mapActionsToProps = {
    getPost,
    clearErrors
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(PostDialog));