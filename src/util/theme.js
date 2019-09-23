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
        position: 'relative'
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
        borderBottom: '1px solid rgba(0,0,0,0.1)',
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
    }
};