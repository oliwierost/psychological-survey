import { Box, Stack, Typography } from "@mui/material"
import { grey } from "@mui/material/colors"
import { AnswerCheckbox } from "./AnswerCheckbox"

export function Question({ questionIndex, question }) {
  const answers = [{ label: "Nie" }, { label: "Tak" }]

  return (
    <Stack justifyContent="center" alignItems="center" spacing={4} width="100%">
      <Typography
        variant="h6"
        align="center"
        noWrap
        sx={{
          overflowWrap: "break-word",
        }}
      >
        {question}
      </Typography>
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
