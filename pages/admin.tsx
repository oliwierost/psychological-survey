import { Container, Stack, OutlinedInput, Alert, Snackbar } from "@mui/material"
import { useState } from "react"
import { BeigeButton } from "components/common/BeigeButton"
import { AdminPanel } from "components/AdminPanel"

export default function admin() {
  const [adminKey, setAdminKey] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)

  const handleClick = () => {
    if (adminKey === process.env.NEXT_PUBLIC_ADMIN_KEY) {
      setIsLoggedIn(true)
    } else {
      setToastOpen(true)
    }
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        height: "100vh",
      }}
    >
      {isLoggedIn ? (
        <AdminPanel />
      ) : (
        <Stack
          spacing={4}
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <OutlinedInput
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClick()
              }
            }}
            type="password"
            onChange={(e) => setAdminKey(e.target.value)}
          />
          <BeigeButton onClick={() => handleClick()}>Zaloguj</BeigeButton>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={toastOpen}
            onClose={() => setToastOpen(false)}
            autoHideDuration={2000}
          >
            <Alert
              onClose={() => setToastOpen(false)}
              severity="error"
              sx={{ width: "100%" }}
            >
              Błędne hasło!
            </Alert>
          </Snackbar>
        </Stack>
      )}
    </Container>
  )
}
