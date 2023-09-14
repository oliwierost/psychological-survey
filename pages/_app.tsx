import Head from "next/head"
import "../styles/globals.css"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import {
  AuthProvider,
  FirebaseAppProvider,
  FirestoreProvider,
  StorageProvider,
  useFirebaseApp,
} from "reactfire"
import { firebaseConfig } from "../firebase.config"
import { getStorage } from "firebase/storage"

import { createTheme, CssBaseline } from "@mui/material"
import "@fontsource/plus-jakarta-sans"

import { ThemeProvider } from "@mui/material/styles"

function FirebaseSDKProviders({ children }) {
  const app = useFirebaseApp()
  const auth = getAuth(app)
  const firestore = getFirestore(app)
  const storage = getStorage(app)

  return (
    <AuthProvider sdk={auth}>
      <FirestoreProvider sdk={firestore}>
        <StorageProvider sdk={storage}>{children}</StorageProvider>
      </FirestoreProvider>
    </AuthProvider>
  )
}

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    components: {
      MuiTypography: {
        defaultProps: {
          fontFamily: "Plus Jakarta Sans",
        },
      },
    },
  })
  return (
    <>
      <Head>
        <title>Guilds</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Get working" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <FirebaseSDKProviders>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </FirebaseSDKProviders>
      </FirebaseAppProvider>
    </>
  )
}

export default MyApp
