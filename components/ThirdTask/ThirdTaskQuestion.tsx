import { Divider, Stack, Typography } from "@mui/material"
import { BeigePaper } from "components/common/BeigePaper"

export function ThirdTaskQuestion() {
  return (
    <BeigePaper height="fit-content">
      <Stack spacing={1}>
        <Divider orientation="horizontal" />
        <Stack alignItems="center" spacing={1}>
          <Typography variant="body1" textAlign="justify" color="grey.800">
            To już ostatnia część tego zadania. Spróbuj przypomnieć sobie, jakie
            zwierzęta widziałeś/łaś na początku. Za chwilę ponownie zobaczysz
            zdjęcia przedstawiające różne zwierzęta. Przy każdym zdjęciu
            zapytamy Cię o to, czy widziałeś/łaś już to konkretne zwierzę w
            poprzedniej serii. Zwróć uwagę, że pytamy o to, czy widziałeś/łaś{" "}
            <span
              style={{
                fontWeight: "bold",
                color: "black",
              }}
            >
              tego konkretnego osobnika
            </span>{" "}
            (np. konkretną krowę przedstawioną na fotografii) a{" "}
            <span
              style={{
                fontWeight: "bold",
                color: "black",
              }}
            >
              nie
            </span>{" "}
            rodzaj zwierzęcia (np. jakąkolwiek krowę).
          </Typography>
          <Typography variant="body1" textAlign="justify" color="grey.800">
            Uwaga! Aby nieco utrudnić rozpoznanie, niektóre zwierzęta
            przedstawiono w trochę innym ujęciu (innej pozie) niż w poprzedniej
            serii zdjęć.
          </Typography>
        </Stack>
        <Divider orientation="horizontal" />
      </Stack>
    </BeigePaper>
  )
}
