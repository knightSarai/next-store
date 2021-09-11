import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    spinnerOverlay: {
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    spinner: {
        margin: "auto",
        display: "inline-block",
        width: " 50px",
        height: "50px",
        border: "3px solid rgba(195, 195, 195, 0.6)",
        borderRadius: "50%",
        borderTopColor: "#636767",
        animation: "spin 1s ease-in-out infinite",
        "-webkit-animation": "spin 1s ease-in-out infinite",
    },
    '@global': {
        "@keyframes spin": {
            to: {
                "-webkit-transform": "rotate(360deg)",
            }
        },
        "@-webkit-keyframes spin": {
            to: {
                "-webkit-transform": " rotate(360deg)",
            }
        }
    },
}))

export default useStyles;