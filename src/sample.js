import { Grid, TextField, Container } from "@mui/material";

function sample() {
  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <card>
            <TextField
              id="email"
              fullWidth
              required
              label="email"
              autoComplete="given-name"
            ></TextField>
          </card>
        </Grid>
        <Grid item xs={6}>
          <card>
            <TextField
              id="firstName"
              fullWidth
              required
              label="firstNAme"
              autoComplete="given-name"
            ></TextField>
          </card>
        </Grid>
      </Grid>
    </Container>
  );
}
export default sample;
