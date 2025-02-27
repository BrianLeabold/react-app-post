import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Post from '../components/post/Post';
import Profile from '../components/profile/Profile';

export class home extends Component {

    componentDidMount() {
        this.props.getPosts();
    }
    render() {
        const { posts, loading } = this.props.data;
        const { pageId = 'Home' } = this.props.data;
        let recentPostsMarkup = !loading ? (
            posts.map((post) => <Post key={post.postId} post={post}></Post>)
        ) : <h1>Loading...</h1>
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    <h1>{pageId}</h1>
                    {recentPostsMarkup}
                </Grid>
                <Grid item sm={4} xs={12} id="aside">
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
