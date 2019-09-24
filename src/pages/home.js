import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Post from '../components/Post';
import Profile from '../components/Profile';

export class home extends Component {

    componentDidMount() {
        this.props.getPosts();
    }
    render() {
        const { posts, loading } = this.props.data;

        let recentPostsMarkup = !loading ? (
            posts.map((post) => <Post key={post.postId} post={post}></Post>)
        ) : <h1>Loading...</h1>
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    <h2>Home</h2>
                    <p>Content</p>
                    {recentPostsMarkup}
                </Grid>
                <Grid item sm={4} xs={12} id="aside">
                    <h3>Profile</h3>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}
home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, { getPosts })(home)
