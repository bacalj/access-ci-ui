import { Component } from "preact";
import { ErrorBoundary, lazy } from "preact-iso";

const AsyncLoadedQABot = lazy(() =>
  import("@snf/access-qa-bot").then(module => ({
    default: module.QABot
  }))
);

// Global reference to the QA bot control methods
let qaBotRef = null;

export class QABot extends Component {
  state = { isOpen: false };

  componentDidMount() {
    // Store simple control methods
    qaBotRef = {
      open: () => this.setState({ isOpen: true }),
      close: () => this.setState({ isOpen: false }),
      toggle: () => this.setState({ isOpen: !this.state.isOpen })
    };
  }

  componentWillUnmount() {
    qaBotRef = null;
  }

  render() {
    const {
      welcome,
      isLoggedIn,
      onOpenChange,
      apiKey,
      embedded,
      loginUrl
    } = this.props;

    // Support environment variable if apiKey is not provided via props
    const botApiKey = apiKey || import.meta.env.VITE_QA_BOT_API_KEY || null;

    if (!botApiKey) {
      console.error("QA Bot: No valid API key provided");
      return null;
    }

    // Detect login state if not provided via props
    const loggedIn = isLoggedIn !== undefined
      ? isLoggedIn
      : document.cookie.split("; ").includes("SESSaccesscisso=1");

    return (
      <ErrorBoundary>
        <AsyncLoadedQABot
          welcome={welcome || "Welcome to ACCESS Q&A Bot!"}
          isLoggedIn={loggedIn}
          open={this.state.isOpen}
          onOpenChange={onOpenChange}
          embedded={embedded === true}
          apiKey={botApiKey}
          loginUrl={loginUrl}
        />
      </ErrorBoundary>
    );
  }
}

// Export the qaBot reference for use in other components
export { qaBotRef };
