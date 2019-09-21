import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';


const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,

    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Post extends Component {
    render() {
        const { classes, post: { body, userName, userImage, createdAt, commentCount, likeCount } } = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} className={classes.image} title="Pofile Image" />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userName}`}>{userName}</Typography>
                    <Typography variant="body2" color="textSecondary">{createdAt}</Typography>
                    <Typography variant="body1">{body}</Typography>
                    <Typography variant="caption">Comments - {commentCount}</Typography>
                    <br />
                    <Typography variant="caption">Likes - {likeCount}</Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Post)