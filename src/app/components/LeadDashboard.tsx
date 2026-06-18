"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  Briefcase,
  CalendarDays,
  ExternalLink,
  Percent,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

const summaryCards = [
  {
    label: "Total Leads",
    value: "12,465",
    trend: "+12.4%",
    trendDir: "up",
    note: "vs. last month",
    icon: Users,
    color: "teal",
    points: "12,29 28,18 42,22 56,10 70,20 84,14 98,24 112,12",
  },
  {
    label: "Upcoming Events",
    value: "24",
    trend: "+3",
    trendDir: "up",
    note: "new this week",
    icon: CalendarDays,
    color: "indigo",
    points: "12,20 26,12 40,17 54,14 68,24 82,18 96,20 110,16",
  },
  {
    label: "Active Deals",
    value: "386",
    trend: "-4.2%",
    trendDir: "down",
    note: "vs. last week",
    icon: Briefcase,
    color: "orange",
    points: "12,14 26,18 40,23 54,13 68,17 82,22 96,19 110,24",
  },
  {
    label: "Conversion Rate",
    value: "8.3%",
    trend: "+1.2pp",
    trendDir: "up",
    note: "this quarter",
    icon: Percent,
    color: "pink",
    points: "12,22 26,20 40,14 54,16 68,12 82,18 96,15 110,20",
  },
];

const pipeline = [
  { name: "Jasminya Park", company: "Textile Group Co.", status: "Proposal", color: "#8b5cf6" },
  { name: "Yongja Chois", company: "MedTech Supplies Ltd.", status: "Qualified", color: "#0ea5e9" },
  { name: "Seenil Jong", company: "Fresh Food Exports", status: "Contacted", color: "#f59e0b" },
  { name: "Joohee Min", company: "Smart Factory Co.", status: "New", color: "#64748b" },
  { name: "Sojung Kim", company: "Wellness Hub Thailand", status: "Won", color: "#10b981" },
];

const categorySegments = [
  { label: "BITEC", value: 44, color: "#0ea5e9" },
  { label: "IMPACT", value: 28, color: "#8b5cf6" },
  { label: "Referral", value: 18, color: "#ec4899" },
  { label: "Manual", value: 10, color: "#f59e0b" },
];

const statusColors: Record<string, string> = {
  New: "#64748b",
  Qualified: "#0ea5e9",
  Contacted: "#f59e0b",
  Proposal: "#8b5cf6",
  Won: "#10b981",
  Lost: "#ef4444",
};

export default function LeadDashboard() {
  const router = useRouter();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/events");
      if (res.ok) {
        const data = await res.json();
        // Load only the top 3 latest events for the dashboard preview
        setEvents((data.events || []).slice(0, 3));
      }
    } catch (err) {
      console.error("Failed to load events preview", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Box className="dashboardPage">
      {/* ── Summary Metric Cards ── */}
      <Box className="summaryGrid">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          const TrendIcon = card.trendDir === "up" ? TrendingUp : TrendingDown;
          return (
            <Paper className="metricCard" key={card.label} elevation={0}>
              <Stack direction="row" className="cardHeader">
                <Typography className="metricLabel">{card.label}</Typography>
                <span className="cardMore">···</span>
              </Stack>
              <Stack direction="row" className="metricBody">
                <Box className={`metricIcon metricIcon-${card.color}`}>
                  <Icon size={18} />
                </Box>
                <Box>
                  <Typography className="metricValue">{card.value}</Typography>
                  <Box className={`metricTrend metricTrend-${card.trendDir}`} component="span" sx={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                    <TrendIcon size={11} />
                    {card.trend}
                  </Box>
                  <Typography className="metricNote">{card.note}</Typography>
                </Box>
              </Stack>
              <svg className={`sparkline sparkline-${card.color}`} viewBox="0 0 124 36" aria-hidden="true">
                <polyline points={card.points} />
              </svg>
            </Paper>
          );
        })}
      </Box>

      <Box className="dashboardGrid">
        {/* ── Upcoming Event Preview Widget ── */}
        <Paper className="dashboardCard ordersCard" elevation={0}>
          <Stack direction="row" className="cardTitleRow" sx={{ mb: 2.5 }}>
            <Box>
              <Typography component="h2" className="cardTitle" sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}>
                Upcoming Event Calendar
              </Typography>
              <Typography sx={{ fontSize: "0.72rem", color: "var(--muted)", mt: 0.25 }}>
                Latest event synchronizations from BITEC and IMPACT
              </Typography>
            </Box>
            <Button
              size="small"
              onClick={() => router.push("/sync")}
              startIcon={<ExternalLink size={12} />}
              sx={{
                fontSize: "0.75rem",
                textTransform: "none",
                color: "var(--brand)",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                px: 1.5,
                py: 0.5,
                bgcolor: "rgba(0,0,0,0.03)",
                "&:hover": {
                  bgcolor: "rgba(0,0,0,0.06)",
                  borderColor: "rgba(0,0,0,0.12)",
                }
              }}
            >
              View Sync Manager
            </Button>
          </Stack>
          <TableContainer>
            <Table size="small" aria-label="upcoming event leads preview">
              <TableHead>
                <TableRow>
                  <TableCell>Event Details</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell align="center">Lead Score</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                      <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem" }}>
                        Loading event leads preview...
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : events.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                      <Typography sx={{ color: "var(--muted)", fontSize: "0.78rem" }}>
                        No event leads found. Open sync manager to pull data.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  events.map((row, idx) => (
                    <TableRow key={row.id || idx} hover>
                      <TableCell sx={{ py: 1.25 }}>
                        <Stack direction="row" spacing={1.5} className="orderNameCell" sx={{ alignItems: "flex-start" }}>
                          <Avatar className={`orderAvatar orderAvatar-${row.source.toLowerCase()}`}>
                            <CalendarDays size={15} />
                          </Avatar>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography className="tablePrimary" sx={{ mb: 0.25 }}>{row.title}</Typography>
                            <Typography className="tableSecondary">
                              {row.source} · {row.venue ?? "Bangkok"} · {row.category}
                            </Typography>
                          </Box>
                        </Stack>
                      </TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell align="center">
                        <Typography
                          sx={{
                            fontSize: "0.78rem",
                            fontWeight: 700,
                            color: row.leadScore >= 90 ? "var(--success)" : "var(--brand)"
                          }}
                        >
                          {row.leadScore}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.status || "Succeed"}
                          size="small"
                          className={`statusPill status-${(row.status || "Succeed").toLowerCase()}`}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* ── Pipeline ── */}
        <Paper className="dashboardCard customersCard" elevation={0}>
          <Stack direction="row" className="cardTitleRow" sx={{ mb: 2 }}>
            <Typography component="h2" className="cardTitle">
              Pipeline
            </Typography>
            <span className="cardMore">···</span>
          </Stack>
          <Stack spacing={2}>
            {pipeline.map((lead) => (
              <Stack direction="row" spacing={1.5} className="customerRow" key={lead.name}>
                <Avatar className="customerAvatar" sx={{ bgcolor: `${lead.color}15`, color: lead.color, width: 34, height: 34, fontSize: "0.85rem", borderRadius: "10px", fontWeight: 700 }}>
                  {lead.name.charAt(0)}
                </Avatar>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography className="tablePrimary" noWrap>{lead.name}</Typography>
                  <Typography className="tableSecondary" noWrap>{lead.company}</Typography>
                </Box>
                <Box sx={{ flexShrink: 0 }}>
                  <Typography
                    sx={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: statusColors[lead.status] ?? "#64748b",
                      background: `${statusColors[lead.status]}18`,
                      borderRadius: "6px",
                      px: "8px",
                      py: "3px",
                      border: `1px solid ${statusColors[lead.status]}25`
                    }}
                  >
                    {lead.status}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Paper>

        {/* ── Leads by Source ── */}
        <Paper className="dashboardCard categoryCard" elevation={0}>
          <Stack direction="row" className="cardTitleRow" sx={{ mb: 0.5 }}>
            <Typography component="h2" className="cardTitle">
              Leads by Source
            </Typography>
            <span className="cardMore">···</span>
          </Stack>
          <Box className="donutWrap">
            <Box className="donutChart">
              <Box className="donutCenter">
                <Typography>BITEC</Typography>
                <strong>44%</strong>
              </Box>
            </Box>
          </Box>
          <Box className="legendGrid">
            {categorySegments.map((segment) => (
              <span key={segment.label}>
                <i style={{ background: segment.color }} />
                {segment.label}
              </span>
            ))}
          </Box>
        </Paper>

        {/* ── Lead Funnel ── */}
        <Paper className="dashboardCard continentCard" elevation={0}>
          <Stack direction="row" className="cardTitleRow">
            <Typography component="h2" className="cardTitle">
              Lead Funnel
            </Typography>
            <span className="cardMore">···</span>
          </Stack>
          <Typography className="mapCount">1,506 Total Leads This Quarter</Typography>
          <LinearProgress variant="determinate" value={72} className="continentProgress" />
          <Stack spacing={1.5} sx={{ mt: 2.5 }}>
            {[
              { label: "New Leads", count: 524, pct: 100 },
              { label: "Qualified Leads", count: 318, pct: 61 },
              { label: "Proposals Sent", count: 196, pct: 37 },
              { label: "Closed Won", count: 125, pct: 24 },
            ].map((stage) => (
              <Box key={stage.label}>
                <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.75 }}>
                  <Typography sx={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--foreground)" }}>{stage.label}</Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "var(--muted)", fontWeight: 700 }}>{stage.count.toLocaleString()}</Typography>
                </Stack>
                <Box sx={{ height: 6, borderRadius: 999, background: "rgba(0, 0, 0, 0.06)", overflow: "hidden" }}>
                  <Box sx={{ height: "100%", width: `${stage.pct}%`, borderRadius: 999, background: "linear-gradient(90deg, var(--brand), var(--accent))" }} />
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
