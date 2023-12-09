import { Divider, Stack, Typography } from "@mui/material"
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
      <Divider
        orientation="horizontal"
        sx={{
          width: "100%",
        }}
      />
      <Stack
        direction="row"
        width="100%"
        justifyContent="space-between"
        position="relative"
        alignItems="center"
      >
        {answers.map((answer, index) => (
          <AnswerCheckbox
            questionIndex={questionIndex}
            answer={answer}
            key={index}
          />
        ))}
      </Stack>
    </Stack>
  )
}
