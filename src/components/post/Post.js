import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { likePost, unLikePost } from '../redux/actions/dataActions';

import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LikeButton from './LikeButton';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';


const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 150,

    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
};

class Post extends Component {

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            post: {
                body,
                createdAt,
                userImage,
                userName,
                postId,
                likeCount,
                commentCount
            },
            user: {
                authenticated,
                credentials: { name }
            }
        } = this.props;
        const deleteButton =
            authenticated && userName === name ? (
                <DeletePost postId={postId} />
            ) : null;

        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} alt="Profile" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userName}`}>{userName}</Typography>
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    {/* {commentButton} */}

                    <IconButton>
                        <CommentIcon color="primary"></CommentIcon>
                    </IconButton>
                    <span>{commentCount}</span>

                    <LikeButton postId={postId} />
                    <span>{likeCount}</span>
                    {deleteButton}
                    <PostDialog postId={postId} userName={userName} />
                </CardContent>
            </Card>
        )
    }
}
Post.propTypes = {
    // likePost: PropTypes.func.isRequired,
    // unLikePost: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.user
})

// const mapActionsToProps = {
//     likePost,
//     unLikePost
// }

export default connect(mapStateToProps)(withStyles(styles)(Post))