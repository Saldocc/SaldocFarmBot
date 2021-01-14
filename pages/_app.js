import "../assets/styles/index.scss";
import { AuthProvider } from "./../contexts/AuthContext"

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (<AuthProvider><Component {...pageProps} /></AuthProvider>
  );
}