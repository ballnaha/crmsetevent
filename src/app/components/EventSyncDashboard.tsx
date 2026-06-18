"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Dayjs } from "dayjs";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Database,
  ExternalLink,
  Search,
  Globe2,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  X,
  UserRound,
} from "lucide-react";

const tabsList = [
  { id: "all", label: "All Sources" },
  { id: "bitec", label: "BITEC Calendar" },
  { id: "impact", label: "IMPACT Muang Thong" },
];

type EventRow = {
  id?: string;
  title: string;
  source: string;
  startsAt?: string | null;
  endsAt?: string | null;
  date: string;
  venue?: string | null;
  hall?: string | null;
  category?: string | null;
  sourceUrl?: string | null;
  imageUrl?: string | null;
  leadIdea?: string | null;
  orderNo?: string | null;
  organizerName?: string | null;
  organizerContactName?: string | null;
  organizerPhone?: string | null;
  organizerEmail?: string | null;
  organizerWebsite?: string | null;
  organizerFacebook?: string | null;
};

function getPaginationItems(page: number, totalPages: number) {
  const visible = new Set([1, totalPages, page - 1, page, page + 1].filter((item) => item >= 1 && item <= totalPages));
  const items: Array<number | "ellipsis"> = [];
  let previous = 0;

  Array.from(visible).sort((a, b) => a - b).forEach((item) => {
    if (previous && item - previous > 1) {
      items.push("ellipsis");
    }
    items.push(item);
    previous = item;
  });

  return items;
}

export default function EventSyncDashboard() {
  const searchParams = useSearchParams();
  const sourceParam = searchParams ? searchParams.get("source") : null;

  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [dataSource, setDataSource] = useState("mock");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<EventRow | null>(null);
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(null);
  const [dateTo, setDateTo] = useState<Dayjs | null>(null);
  const [yearFilter, setYearFilter] = useState(String(new Date().getFullYear()));
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const syncYear = new Date().getFullYear();
  const syncYears = [syncYear];
  const syncYearLabel = String(syncYear);

  // Sync activeTab state when source URL param changes (e.g. from Sidebar deep-links)
  useEffect(() => {
    if (sourceParam && ["all", "bitec", "impact"].includes(sourceParam)) {
      setActiveTab(sourceParam);
    } else if (!sourceParam) {
      setActiveTab("all");
    }
    setPage(1);
  }, [sourceParam]);


  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/events");
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events || []);
        setDataSource(data.source || "mock");
      }
    } catch (err) {
      console.error("Failed to load events", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    if (syncing) return;

    try {
      setSyncing(true);
      // Pass the active tab as a query parameter (e.g. ?source=bitec)
      const res = await fetch(`/api/sync?source=${activeTab}&year=${syncYear}`, { method: "POST" });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          await fetchEvents();
        }
      }
    } catch (err) {
      console.error("Sync failed", err);
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter events dynamically on client side for zero-lag transitioning
  const filteredEvents = events.filter((e) => {
    const matchesSource = activeTab === "all" || e.source.toLowerCase() === activeTab;
    if (!matchesSource) return false;

    const eventYear = e.startsAt ? new Date(e.startsAt).getFullYear() : Number(e.date.match(/\b(20\d{2}|21\d{2})\b/)?.[1]);
    if (yearFilter !== "all" && eventYear !== Number(yearFilter)) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const hit = e.title.toLowerCase().includes(q)
        || (e.category ?? "").toLowerCase().includes(q)
        || (e.hall ?? "").toLowerCase().includes(q)
        || (e.organizerName ?? "").toLowerCase().includes(q)
        || (e.organizerEmail ?? "").toLowerCase().includes(q)
        || (e.orderNo ?? "").toLowerCase().includes(q);
      if (!hit) return false;
    }

    if (!dateFrom && !dateTo) return true;
    if (!e.startsAt) return true;

    const start = new Date(e.startsAt);
    const end = e.endsAt ? new Date(e.endsAt) : start;
    const from = dateFrom ? dateFrom.startOf("day").toDate() : null;
    const to = dateTo ? dateTo.endOf("day").toDate() : null;

    return (!from || end >= from) && (!to || start <= to);
  });

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / rowsPerPage));
  const pagedEvents = filteredEvents.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const firstItem = filteredEvents.length === 0 ? 0 : (page - 1) * rowsPerPage + 1;
  const lastItem = Math.min(page * rowsPerPage, filteredEvents.length);
  const paginationItems = getPaginationItems(page, totalPages);
  const hasDateFilter = Boolean(dateFrom || dateTo);
  const dateRangeInvalid = Boolean(dateFrom && dateTo && dateFrom.isAfter(dateTo, "day"));
  const datePickerSlotProps = {
    textField: {
      size: "small" as const,
      sx: {
        width: { xs: "100%", sm: 170 },
        "& .MuiInputBase-root, & .MuiPickersInputBase-root": {
          height: 38,
          color: "var(--foreground)",
          bgcolor: "#ffffff",
          borderRadius: "8px",
        },
        "& .MuiPickersOutlinedInput-notchedOutline, & .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(148, 163, 184, 0.28)",
        },
        "&:hover .MuiPickersOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(56, 189, 248, 0.55)",
        },
        "& .Mui-focused .MuiPickersOutlinedInput-notchedOutline, & .Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "var(--brand)",
          borderWidth: 1,
        },
        "& .MuiInputLabel-root": { color: "var(--muted)", fontSize: "0.76rem", fontWeight: 700 },
        "& .MuiInputLabel-root.Mui-focused": { color: "var(--brand)" },
        "& input, & .MuiPickersSectionList-root, & .MuiPickersSectionList-section, & .MuiPickersSectionList-sectionContent": {
          color: "var(--foreground)",
          fontSize: "0.78rem",
          fontWeight: 700,
        },
        "& .MuiPickersSectionList-sectionContent.Mui-selected": {
          bgcolor: "rgba(14, 165, 233, 0.18)",
          color: "var(--foreground)",
        },
        "& .MuiPickersInputBase-sectionsContainer": {
          py: 0,
        },
        "& .MuiIconButton-root": {
          color: "#38bdf8",
          mr: -0.4,
        },
        "& .MuiSvgIcon-root": {
          color: "inherit",
          fontSize: 18,
        },
      },
    },
  };
  const datePickerPaperSx = {
    bgcolor: "#ffffff",
    color: "var(--foreground)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
    "& .MuiTypography-root, & .MuiPickersCalendarHeader-label, & .MuiPickersYear-yearButton": {
      color: "var(--foreground)",
    },
    "& .MuiPickersCalendarHeader-switchViewButton, & .MuiPickersArrowSwitcher-button": {
      color: "var(--muted)",
    },
    "& .MuiPickersDay-root": {
      color: "var(--foreground)",
      borderRadius: "8px",
    },
    "& .MuiPickersDay-root:hover": {
      bgcolor: "rgba(14, 165, 233, 0.12)",
    },
    "& .MuiPickersDay-root.Mui-selected": {
      color: "#ffffff",
      bgcolor: "var(--brand)",
      fontWeight: 800,
    },
    "& .MuiPickersDay-root.MuiPickersDay-today": {
      borderColor: "var(--brand)",
    },
    "& .MuiDayCalendar-weekDayLabel": {
      color: "var(--muted)",
      fontWeight: 800,
    },
    "& .MuiPickersYear-yearButton.Mui-selected": {
      color: "#ffffff",
      bgcolor: "var(--brand)",
    },
  };
  const closeDetails = () => setSelectedEvent(null);

  return (
    <Box className="dashboardPage">
      {/* Page Header */}
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 1 }}>
        <Box>
          <Typography component="h1" sx={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "-0.5px", color: "var(--foreground)" }}>
            Calendar Scraper Sync
          </Typography>
          <Typography sx={{ fontSize: "0.78rem", color: "var(--muted)", mt: 0.25 }}>
            Scrape and import event calendars from BITEC and IMPACT Exhibition Centers.
          </Typography>
        </Box>
        <Chip
          label={dataSource === "database" ? "DB Live Connection" : dataSource === "cache" ? "Cached JSON File" : "Mock Sandbox Data"}
          icon={<Database size={11} />}
          sx={{
            fontSize: "0.7rem",
            height: 22,
            bgcolor: dataSource === "database" ? "rgba(16, 185, 129, 0.12)" : "rgba(245, 158, 11, 0.12)",
            color: dataSource === "database" ? "var(--success)" : "var(--warning)",
            border: `1px solid ${dataSource === "database" ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)"}`,
            "& .MuiChip-icon": { color: "inherit" },
            fontWeight: 600
          }}
        />
      </Stack>

      {/* Tabs Selector & Trigger Panel */}
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mt: 1.5, flexWrap: "wrap", gap: 2 }}>
        {/* Custom Glassmorphic Tabs */}
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            p: "4px",
            bgcolor: "rgba(0,0,0,0.03)",
            borderRadius: "10px",
            border: "1px solid var(--line)",
            width: "max-content"
          }}
        >
          {tabsList.map((tab) => (
            <Button
              key={tab.id}
              size="small"
              onClick={() => { setActiveTab(tab.id); setPage(1); }}
              sx={{
                textTransform: "none",
                fontSize: "0.78rem",
                px: 2,
                py: 0.5,
                borderRadius: "7px",
                bgcolor: activeTab === tab.id ? "var(--brand-light)" : "transparent",
                color: activeTab === tab.id ? "#fff" : "var(--muted)",
                border: activeTab === tab.id ? "1px solid rgba(14, 165, 233, 0.25)" : "1px solid transparent",
                fontWeight: activeTab === tab.id ? 600 : 500,
                transition: "all 0.15s ease",
                "&:hover": {
                  bgcolor: activeTab === tab.id ? "var(--brand-light)" : "rgba(0,0,0,0.06)",
                  color: activeTab === tab.id ? "#fff" : "var(--foreground)"
                }
              }}
            >
              {tab.label}
            </Button>
          ))}
        </Stack>

        {/* Sync Trigger Button */}
        <Stack spacing={0.75} sx={{ alignItems: { xs: "stretch", sm: "flex-end" } }}>
          <Button
            variant="contained"
            disabled={syncing}
            onClick={handleSync}
            aria-busy={syncing}
            startIcon={
              <Box
                component="span"
                sx={{
                  display: "inline-flex",
                  animation: syncing ? "spin 1.2s linear infinite" : "none",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" }
                  }
                }}
              >
                <RefreshCw size={13} />
              </Box>
            }
            sx={{
              minWidth: 180,
              fontSize: "0.78rem",
              textTransform: "none",
              bgcolor: syncing ? "rgba(14, 165, 233, 0.72)" : "var(--brand)",
              color: "#fff",
              fontWeight: 600,
              borderRadius: "8px",
              px: 2.25,
              py: 0.75,
              boxShadow: syncing ? "0 0 18px rgba(14, 165, 233, 0.36)" : "0 0 10px rgba(14, 165, 233, 0.3)",
              "&:hover": {
                bgcolor: syncing ? "rgba(14, 165, 233, 0.72)" : "var(--brand-hover)",
                boxShadow: syncing ? "0 0 18px rgba(14, 165, 233, 0.36)" : "0 0 15px rgba(14, 165, 233, 0.45)",
              },
              "&.Mui-disabled": {
                bgcolor: "rgba(14, 165, 233, 0.72)",
                color: "#fff",
                opacity: 1,
                cursor: "wait",
                boxShadow: "0 0 18px rgba(14, 165, 233, 0.36)",
              },
              "& .MuiButton-startIcon": {
                color: "inherit",
              },
            }}
          >
            {syncing
              ? "กำลัง Sync ข้อมูล..."
              : activeTab === "all"
              ? `Sync All ${syncYearLabel}`
              : `Sync ${activeTab.toUpperCase()} ${syncYearLabel}`}
          </Button>
          {syncing && (
            <Typography
              role="status"
              aria-live="polite"
              sx={{
                fontSize: "0.72rem",
                color: "var(--brand)",
                fontWeight: 600,
                textAlign: { xs: "left", sm: "right" },
              }}
            >
              กำลังดึงข้อมูลและบันทึกเข้า DB...
              {` (${syncYearLabel})`}
            </Typography>
          )}
        </Stack>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid var(--line)",
          borderRadius: "8px",
          bgcolor: "rgba(0,0,0,0.03)",
          p: 1.5,
        }}
      >
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", flexWrap: "wrap", rowGap: 1.25 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", minWidth: { xs: "100%", sm: "auto" } }}>
            <Box
              sx={{
                display: "grid",
                placeItems: "center",
                width: 30,
                height: 30,
                borderRadius: "8px",
                color: "var(--brand)",
                bgcolor: "rgba(14, 165, 233, 0.1)",
                border: "1px solid rgba(14, 165, 233, 0.18)",
                flexShrink: 0,
              }}
            >
              <CalendarDays size={14} />
            </Box>
            <Box>
              <Typography sx={{ color: "var(--foreground)", fontSize: "0.78rem", fontWeight: 800, lineHeight: 1.2 }}>
                Date Range
              </Typography>
              <Typography sx={{ color: "var(--muted-light)", fontSize: "0.68rem", fontWeight: 600 }}>
                Current year only
              </Typography>
            </Box>
          </Stack>

          <FormControl
            size="small"
            sx={{
              width: { xs: "100%", sm: 150 },
              "& .MuiInputBase-root": {
                height: 38,
                color: "var(--foreground)",
                bgcolor: "#ffffff",
                borderRadius: "8px",
                fontSize: "0.78rem",
                fontWeight: 700,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(148, 163, 184, 0.28)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(56, 189, 248, 0.55)",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--brand)",
                borderWidth: 1,
              },
              "& .MuiSvgIcon-root": {
                color: "#38bdf8",
              },
            }}
          >
            <Select
              value={yearFilter}
              displayEmpty
              onChange={(event) => {
                setYearFilter(event.target.value);
                setPage(1);
              }}
              inputProps={{ "aria-label": "Filter by year" }}
            >
              {syncYears.map((year) => (
                <MenuItem key={year} value={String(year)}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="From"
              value={dateFrom}
              format="DD/MM/YYYY"
              onChange={(value) => {
                setDateFrom(value);
                setPage(1);
              }}
              slotProps={{
                textField: {
                  ...datePickerSlotProps.textField,
                  error: dateRangeInvalid,
                },
              }}
            />
            <DatePicker
              label="To"
              value={dateTo}
              format="DD/MM/YYYY"
              onChange={(value) => {
                setDateTo(value);
                setPage(1);
              }}
              slotProps={{
                textField: {
                  ...datePickerSlotProps.textField,
                  error: dateRangeInvalid,
                  helperText: dateRangeInvalid ? "Check range" : "",
                  sx: {
                    ...datePickerSlotProps.textField.sx,
                    "& .MuiFormHelperText-root": { color: "var(--danger)", fontSize: "0.68rem", mt: 0.4 },
                  },
                },
              }}
            />
          </LocalizationProvider>
          {(dateFrom || dateTo) && (
            <Button
              size="small"
              onClick={() => {
                setDateFrom(null);
                setDateTo(null);
                setPage(1);
              }}
              sx={{
                minHeight: 36,
                textTransform: "none",
                color: "var(--muted)",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                px: 1.4,
                fontSize: "0.76rem",
                fontWeight: 700,
                "&:hover": {
                  color: "var(--foreground)",
                  bgcolor: "rgba(0,0,0,0.06)",
                  borderColor: "rgba(0,0,0,0.16)",
                },
              }}
            >
              Clear Range
            </Button>
          )}
          <Typography sx={{ color: "var(--muted-light)", fontSize: "0.72rem", fontWeight: 600, ml: { sm: "auto" } }}>
            {filteredEvents.length} matched
          </Typography>
        </Stack>
      </Paper>

      {/* Main Scraped Events List Card */}
      <Paper className="dashboardCard ordersCard" elevation={0} sx={{ mt: 1 }}>
        <Stack direction="row" className="cardTitleRow" sx={{ mb: 2 }}>
          <Typography component="h2" className="cardTitle">
            {activeTab === "all"
              ? "All Synced Event Leads"
              : activeTab === "bitec"
              ? "BITEC Synced Event Leads"
              : "IMPACT Synced Event Leads"}
          </Typography>
          <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", px: 1.25, py: 0.6, bgcolor: "rgba(0,0,0,0.04)", minWidth: 220 }}>
            <Search size={13} color="var(--muted)" />
            <Box component="input" placeholder="ค้นหาชื่องาน ผู้จัด หมวด..." value={search} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSearch(e.target.value); setPage(1); }}
              sx={{ flex: 1, background: "none", border: "none", outline: "none", color: "var(--foreground)", fontSize: "0.82rem", fontFamily: "inherit", "&::placeholder": { color: "var(--muted-light)" } }} />
            {search && (
              <Box component="button" onClick={() => { setSearch(""); setPage(1); }}
                sx={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted)", display: "flex", alignItems: "center", p: 0, "&:hover": { color: "var(--foreground)" } }}>
                <X size={12} />
              </Box>
            )}
          </Stack>
        </Stack>

        <TableContainer>
          <Table size="small" aria-label="synced event leads list">
            <TableHead>
              <TableRow>
                <TableCell>Event Details</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Lead ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 8 }}>
                    <Typography sx={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                      Loading synced event leads...
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : filteredEvents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center" sx={{ py: 8 }}>
                    <Typography sx={{ color: "var(--muted)", fontSize: "0.85rem" }}>
                      {hasDateFilter ? "No events found for this date range." : "No events found for this source. Click sync to retrieve live data."}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                pagedEvents.map((row, idx) => {
                  return (
                    <TableRow
                      key={row.id || idx}
                      hover
                      onClick={() => setSelectedEvent(row)}
                      sx={{ cursor: "pointer" }}
                    >
                    <TableCell sx={{ py: 1.25 }}>
                      <Stack direction="row" spacing={1.5} className="orderNameCell" sx={{ alignItems: "flex-start" }}>
                        {row.imageUrl ? (
                          <Box
                            component="img"
                            src={row.imageUrl}
                            alt={row.title}
                            sx={{
                              width: 52,
                              height: 52,
                              borderRadius: "8px",
                              objectFit: "cover",
                              border: "1px solid var(--line)",
                              flexShrink: 0,
                              bgcolor: "rgba(0,0,0,0.04)",
                            }}
                            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                          />
                        ) : (
                          <Avatar className={`orderAvatar orderAvatar-${row.source.toLowerCase()}`} sx={{ mt: 0.25 }}>
                            <CalendarDays size={16} />
                          </Avatar>
                        )}
                        <Box sx={{ minWidth: 0 }}>
                          <Typography className="tablePrimary" sx={{ mb: 0.25 }}>{row.title}</Typography>
                          <Typography className="tableSecondary" sx={{ mb: 0.75 }}>
                            {row.source} · {row.venue ?? "Bangkok"} · {row.category}
                          </Typography>
                          <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", flexWrap: "wrap", rowGap: 0.5 }}>
                            {(row.organizerName || row.organizerContactName || row.organizerPhone || row.organizerEmail || row.organizerWebsite) && (
                              <Chip
                                label="Contact"
                                size="small"
                                icon={<UserRound size={11} />}
                                sx={{
                                  height: 22,
                                  fontSize: "0.68rem",
                                  bgcolor: "rgba(16, 185, 129, 0.1)",
                                  color: "var(--success)",
                                  border: "1px solid rgba(16, 185, 129, 0.18)",
                                  "& .MuiChip-icon": { color: "inherit" },
                                }}
                              />
                            )}
                            <Typography sx={{ color: "var(--muted-light)", fontSize: "0.7rem", fontWeight: 600 }}>
                              Click for details
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <Typography className="tableSecondary" sx={{ fontWeight: 600, color: "var(--foreground) !important" }}>
                        {row.orderNo || `LD-${row.id}`}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" className="tableFooter" sx={{ mt: 2 }}>
          <Typography sx={{ fontSize: "0.78rem", fontWeight: 600 }}>
            Showing {firstItem}-{lastItem} of {filteredEvents.length} events
          </Typography>
          <Stack direction="row" className="paginationControls" aria-label="Event table pagination">
            <IconButton
              size="small"
              className="paginationIcon"
              disabled={page === 1}
              aria-label="First page"
              onClick={() => setPage(1)}
            >
              <ChevronsLeft size={14} />
            </IconButton>
            <IconButton
              size="small"
              className="paginationIcon"
              disabled={page === 1}
              aria-label="Previous page"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft size={14} />
            </IconButton>
            <Stack direction="row" className="paginationPages">
              {paginationItems.map((item, idx) => (
                item === "ellipsis" ? (
                  <Box key={`ellipsis-${idx}`} component="span" className="paginationEllipsis">...</Box>
                ) : (
                  <Button
                    key={item}
                    size="small"
                    aria-label={`Page ${item}`}
                    aria-current={item === page ? "page" : undefined}
                    className={item === page ? "paginationPage paginationPageActive" : "paginationPage"}
                    onClick={() => setPage(item)}
                  >
                    {item}
                  </Button>
                )
              ))}
            </Stack>
            <IconButton
              size="small"
              className="paginationIcon"
              disabled={page === totalPages}
              aria-label="Next page"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight size={14} />
            </IconButton>
            <IconButton
              size="small"
              className="paginationIcon"
              disabled={page === totalPages}
              aria-label="Last page"
              onClick={() => setPage(totalPages)}
            >
              <ChevronsRight size={14} />
            </IconButton>
          </Stack>
        </Stack>
      </Paper>

      <Dialog
        open={Boolean(selectedEvent)}
        onClose={closeDetails}
        fullWidth
        maxWidth="md"
        slotProps={{
          paper: {
            sx: {
              bgcolor: "var(--panel-solid)",
              color: "var(--foreground)",
              border: "1px solid var(--line)",
              borderRadius: "8px",
              boxShadow: "var(--shadow-md)",
              overflow: "hidden",
            },
          },
        }}
      >
        {selectedEvent && (
          <>
            {selectedEvent.imageUrl && (
              <Box
                component="img"
                src={selectedEvent.imageUrl}
                alt={selectedEvent.title}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  display: "block",
                  bgcolor: "rgba(0,0,0,0.04)",
                }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            )}
            <DialogTitle sx={{ p: 0 }}>
              <Stack
                direction="row"
                sx={{
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 2,
                  p: 2.5,
                  borderBottom: "1px solid var(--line)",
                  bgcolor: "rgba(0,0,0,0.02)",
                }}
              >
                <Stack direction="row" spacing={1.5} sx={{ minWidth: 0 }}>
                  <Avatar className={`orderAvatar orderAvatar-${selectedEvent.source.toLowerCase()}`}>
                    <CalendarDays size={16} />
                  </Avatar>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography component="h2" sx={{ color: "var(--foreground)", fontSize: "1rem", fontWeight: 800, lineHeight: 1.3 }}>
                      {selectedEvent.title}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap", rowGap: 0.75, mt: 1 }}>
                      <Chip label={selectedEvent.source} size="small" sx={{ height: 22, fontSize: "0.7rem", bgcolor: "var(--brand-light)", color: "var(--brand)", fontWeight: 700 }} />
                      <Typography sx={{ color: "var(--muted)", fontSize: "0.76rem", fontWeight: 600 }}>
                        {selectedEvent.orderNo || `LD-${selectedEvent.id}`}
                      </Typography>
                    </Stack>
                  </Box>
                </Stack>
                <IconButton
                  aria-label="Close event details"
                  onClick={closeDetails}
                  sx={{
                    width: 34,
                    height: 34,
                    color: "var(--muted)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    flexShrink: 0,
                    "&:hover": { color: "var(--foreground)", bgcolor: "rgba(0,0,0,0.06)" },
                  }}
                >
                  <X size={16} />
                </IconButton>
              </Stack>
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
                  gap: 0,
                }}
              >
                <Stack spacing={2.25} sx={{ p: 2.5, borderRight: { md: "1px solid var(--line)" } }}>
                  <Box>
                    <Typography sx={{ color: "var(--foreground)", fontSize: "0.78rem", fontWeight: 800, mb: 1.25 }}>
                      Event Summary
                    </Typography>
                    <Stack spacing={1.2}>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <CalendarDays size={14} color="var(--brand)" />
                        <Typography sx={{ color: "var(--muted)", fontSize: "0.8rem" }}>{selectedEvent.date}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <MapPin size={14} color="var(--brand)" />
                        <Typography sx={{ color: "var(--muted)", fontSize: "0.8rem" }}>
                          {selectedEvent.venue || "Bangkok"}{selectedEvent.hall ? ` · ${selectedEvent.hall}` : ""}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <Database size={14} color="var(--brand)" />
                        <Typography sx={{ color: "var(--muted)", fontSize: "0.8rem" }}>
                          {selectedEvent.category || "General Event"}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>

                  <Divider sx={{ borderColor: "var(--line)" }} />

                  <Box>
                    <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
                      <Lightbulb size={14} color="var(--warning)" />
                      <Typography sx={{ color: "var(--foreground)", fontSize: "0.78rem", fontWeight: 800 }}>
                        Lead Opportunity
                      </Typography>
                    </Stack>
                    <Typography
                      sx={{
                        color: "var(--muted)",
                        fontSize: "0.82rem",
                        lineHeight: 1.6,
                        border: "1px solid var(--line)",
                        bgcolor: "rgba(0,0,0,0.03)",
                        borderRadius: "8px",
                        p: 1.5,
                      }}
                    >
                      {selectedEvent.leadIdea || "No lead idea available for this event."}
                    </Typography>
                  </Box>
                </Stack>

                <Stack spacing={2.25} sx={{ p: 2.5 }}>
                  <Box>
                    <Typography sx={{ color: "var(--foreground)", fontSize: "0.78rem", fontWeight: 800, mb: 1.25 }}>
                      Organizer Contact
                    </Typography>
                    <Stack spacing={1.15}>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
                        <UserRound size={14} color="var(--success)" style={{ marginTop: 3 }} />
                        <Box>
                          <Typography sx={{ color: "var(--muted-light)", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase" }}>
                            Organizer
                          </Typography>
                          <Typography sx={{ color: "var(--foreground)", fontSize: "0.82rem", fontWeight: 600 }}>
                            {selectedEvent.organizerName || "Not provided"}
                          </Typography>
                          {selectedEvent.organizerContactName && (
                            <Typography sx={{ color: "var(--muted)", fontSize: "0.76rem", mt: 0.25 }}>
                              {selectedEvent.organizerContactName}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <Phone size={14} color="var(--success)" />
                        <Typography sx={{ color: selectedEvent.organizerPhone ? "var(--foreground)" : "var(--muted-light)", fontSize: "0.8rem" }}>
                          {selectedEvent.organizerPhone || "Phone not provided"}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <Mail size={14} color="var(--success)" />
                        <Typography sx={{ color: selectedEvent.organizerEmail ? "var(--foreground)" : "var(--muted-light)", fontSize: "0.8rem" }}>
                          {selectedEvent.organizerEmail || "Email not provided"}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center", minWidth: 0 }}>
                        <Globe2 size={14} color="var(--success)" />
                        <Typography sx={{ color: selectedEvent.organizerWebsite ? "var(--foreground)" : "var(--muted-light)", fontSize: "0.8rem", wordBreak: "break-word" }}>
                          {selectedEvent.organizerWebsite || "Website not provided"}
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center", minWidth: 0 }}>
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                        {selectedEvent.organizerFacebook ? (
                          <Typography sx={{ color: "var(--foreground)", fontSize: "0.8rem", wordBreak: "break-word" }}>
                            <a
                              href={selectedEvent.organizerFacebook.startsWith("http") ? selectedEvent.organizerFacebook : `https://${selectedEvent.organizerFacebook}`}
                              target="_blank"
                              rel="noreferrer"
                              style={{ color: "inherit", textDecoration: "underline" }}
                            >
                              Facebook Page
                            </a>
                          </Typography>
                        ) : (
                          <Typography sx={{ color: "var(--muted-light)", fontSize: "0.8rem" }}>
                            Facebook not provided
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  </Box>

                  {selectedEvent.sourceUrl && (
                    <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
                      <Button
                        component="a"
                        href={selectedEvent.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        endIcon={<ExternalLink size={13} />}
                        sx={{
                          textTransform: "none",
                          color: "#fff",
                          bgcolor: "var(--brand)",
                          borderRadius: "8px",
                          fontSize: "0.76rem",
                          fontWeight: 700,
                          px: 1.6,
                          "&:hover": { bgcolor: "var(--brand-hover)" },
                        }}
                      >
                        Source Page
                      </Button>
                    </Stack>
                  )}
                </Stack>
              </Box>

            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}
