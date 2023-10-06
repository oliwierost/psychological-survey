import { Box, Divider, Stack, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { AnswerCheckbox } from "./AnswerCheckbox"

export function Question({ questionIndex, question }) {
  const answers = [{ label: "Nie" }, { label: "Tak" }]

  return (
    <Stack justifyContent="center" alignItems="center" spacing={1} width="100%">
      <Typography
        variant="body1"
        align="center"
        noWrap
        sx={{
          overflowWrap: "break-word",
        }}
      >
        {question}
      </Typography>
      <Divider orientation="horizontal" width="100%" />
      <Stack
        direction="row"
        width="100%"
        justifyContent="space-between"
        position="relative"
        alignItems="center"
      >
        {answers.map((answer) => (
          <AnswerCheckbox questionIndex={questionIndex} answer={answer} />
        ))}
      </Stack>
    </Stack>
  )
}
