import { Box, Link, Stack, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" className="appFooter">
      <Typography className="footerCopy">
        CRM Set Event keeps new customer leads organized from event calendars to sales follow-up.
      </Typography>
      <Stack direction="row" spacing={2} className="footerLinks">
        <Link href="/api/sources" target="_blank" rel="noreferrer">
          API sources
        </Link>
        <Link href="https://www.bitec.co.th/" target="_blank" rel="noreferrer">
          BITEC
        </Link>
        <Link href="https://www.impact.co.th/en/visitors/event-calendar" target="_blank" rel="noreferrer">
          IMPACT
        </Link>
      </Stack>
    </Box>
  );
}

