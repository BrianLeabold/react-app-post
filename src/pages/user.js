import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import PostSkeleton from '../util/PostSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserDetails } from '../redux/actions/dataActions';
import Post from '../components/post/Post';

class user extends Component {
    state = {
        profile: null,
        postIdParam: null
    };
    componentDidMount() {
        const name = this.props.match.params.name;
        const postId = this.props.match.params.postId;

        if (postId) this.setState({ postIdParam: postId });

        this.props.getUserDetails(name);
        axios
            .get(`/user/${name}`)
            .then((res) => {
                this.setState({
                    profile: res.data.user
                });
            })
            .catch((err) => console.log(err));
    }
    render() {
        const { posts, loading } = this.props.data;
        const { postIdParam } = this.state;

        const postsMarkup = loading ? (
            <PostSkeleton />
        ) : posts === null ? (
            <p>No posts from this user</p>
        ) : !postIdParam ? (
            posts.map((post) => <Post key={post.postId} post={post} />)
        ) : (
                        posts.map((post) => {
                            if (post.postId !== postIdParam)
                                return <Post key={post.postId} post={post} />;
                            else return <Post key={post.postId} post={post} openDialog />;
                        })
                    );

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {postsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null ? (
                        <ProfileSkeleton />
                    ) : (
                            <StaticProfile profile={this.state.profile} />
                        )}
                </Grid>
            </Grid>
        );
    }
}

user.propTypes = {
    getUserDetails: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(
    mapStateToProps,
    { getUserDetails }
)(user);