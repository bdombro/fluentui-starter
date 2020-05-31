import React from 'react';
import {AuthenticationProvider} from "./authentication";
import {NavProvider} from "./nav";
import {ThemeProvider} from "./theme";

class Providers extends React.Component {
  render() {
    const {children} = this.props;
    return (
      <AuthenticationProvider>
        <NavProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </NavProvider>
      </AuthenticationProvider>
    )
  }
}
export default Providers;