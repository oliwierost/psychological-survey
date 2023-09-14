import { Card, Stack, styled, Typography } from "@mui/material"

const LetterText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  userSelect: "none",
  fontSize: "4rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "4rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "3rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "0.5rem",
  },
}))

export function Slot({ letter, index, onClick }) {
  return (
    <Card
      sx={{
        width: "100%",
        aspectRatio: "1/1",
        cursor: letter ? "pointer" : "default",
        maxWidth: "7rem",
      }}
      key={index}
      onClick={() => onClick(index)}
    >
      <Stack justifyContent="center" alignItems="center" height="100%">
        <LetterText textAlign="center" variant="h3" sx={{ userSelect: "none" }}>
          {letter ? letter.letter : null}
        </LetterText>
      </Stack>
    </Card>
  )
}
