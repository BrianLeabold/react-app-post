import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/dataActions';

export class LikeButton extends Component {
    likedPost = () => {
        if (
            this.props.user.likes &&
            this.props.user.likes.find(
                (like) => like.postId === this.props.postId
            )
        )
            return true;
        else return false;
    };
    likePost = () => {
        this.props.likePost(this.props.postId);
    }

    unlikePost = () => {
        this.props.unlikePost(this.props.postId);
    };

    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/login">
                <Tooltip title="login to like this" placement="top">
                    <IconButton>
                        <FavoriteBorder color="primary" />
                    </IconButton>
                </Tooltip>
            </Link>
        ) : this.likedPost() ? (
            <Tooltip title="unlike">
                <IconButton onClick={this.unlikePost}>
                    <FavoriteIcon color="error" />
                </IconButton>
            </Tooltip>
        ) : (
                    <Tooltip title="like">
                        <IconButton onClick={this.likePost}>
                            <FavoriteBorder color="error" />
                        </IconButton>
                    </Tooltip>
                );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likePost,
    unlikePost
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(LikeButton);