export default {

    palette: {
        primary: {
            light: '#534bae',
            main: '#1a237e',
            dark: '#000051',
            contrastText: '#ffffff'
        },
        secondary: {
            light: '#efefef',
            main: '#bdbdbd',
            dark: '#8d8d8d',
            contrastText: '#000000'
        }
    },
    typography: { useNextVariants: true },

    formContainer: {
        textAlign: 'center'
    },
    appIcon: {
        margin: '20px auto',
        width: 100
    },
    pageTitle: {

    },
    textField: {
        marginTop: '15px'
    },
    submitButton: {
        marginTop: '15px',
        float: 'right',
        position: 'relative'
    },
    commentButton: {
        marginTop: '15px'
    },
    closeButton: {
        float: 'right',
        position: 'relative'
    },
    dialogCloseButton: {
        position: 'absolute',
        left: '89.3%'
    },
    dialogClose: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    },
    progress: {
        position: 'absolute',

    },
    customError: {
        marginTop: '15px',
        color: 'red',
        fontSize: '.8rem'
    },
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid #cccccc',
        marginBottom: 20
    },
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            textAlign: 'center',
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'left',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: '#000051'
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    '& .editButton': {
        float: 'right'
    },
    progressSpinner: {
        position: 'absolute'
    },
    profileImage: {
        maxWidth: 150,
        height: 150,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20,
        margin: 5
    },

    expandButton: {

        marginTop: '0px'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20
    }

};