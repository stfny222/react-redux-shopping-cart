import React from 'react'

// click/tap handlers for material-ui
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// material-ui connector
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// main styles
import '../assets/styles/main.scss'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#00ACCD',
    primary2Color: '#00ACCD',
    primary3Color: '#58595B',
  },
})

// could include an AppBar or NavBar
const initApp = (props) => (
		<MuiThemeProvider muiTheme={muiTheme}>
			<main>
				{props.children}
			</main>
		</MuiThemeProvider>
)

export default initApp
