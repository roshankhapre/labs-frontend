import { useEffect, useState, useCallback } from "react";
import API from "@/api/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarDays,
  Phone,
  Mail,
  User,
  IndianRupee,
  Filter,
  Search,
  ChevronDown,
  MoreVertical,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  ArrowUpDown,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  Hash,
  Settings,
  Bell,
  RotateCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    revenue: 0,
  });

  // Auto-refresh state
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchBookings();

    // Set up auto-refresh interval
    let intervalId;
    if (autoRefresh) {
      intervalId = setInterval(() => {
        fetchBookings();
      }, refreshInterval * 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRefresh, refreshInterval]);

  // Function to generate a reference ID (LB + random 4-digit number)
  const generateReferenceId = () => {
    return `LB${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API.get("/bookings", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      const data = response.data;
      let bookingsData = [];

      if (Array.isArray(data)) {
        bookingsData = data;
      } else if (data.bookings && Array.isArray(data.bookings)) {
        bookingsData = data.bookings;
      }

      // Add reference ID to each booking if it doesn't exist
      const bookingsWithRef = bookingsData.map((booking) => ({
        ...booking,
        referenceId: booking.referenceId || generateReferenceId(),
      }));

      // Sort by date (newest first)
      bookingsWithRef.sort(
        (a, b) =>
          new Date(b.createdAt || b.bookingDate) -
          new Date(a.createdAt || a.bookingDate)
      );
      setBookings(bookingsWithRef);
      setLastRefreshed(new Date());

      // Calculate stats
      calculateStats(bookingsWithRef);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateStats = (bookingsData) => {
    const total = bookingsData.length;
    const pending = bookingsData.filter((b) => b.status === "Pending").length;
    const confirmed = bookingsData.filter(
      (b) => b.status === "Confirmed"
    ).length;
    const completed = bookingsData.filter(
      (b) => b.status === "Completed"
    ).length;
    const revenue = bookingsData.reduce(
      (sum, booking) => sum + (booking.paidAmount || 0),
      0
    );

    setStats({ total, pending, confirmed, completed, revenue });
  };

  // CSV Export Function
  const exportToCSV = async () => {
    try {
      setExporting(true);

      // Determine which data to export (filtered or all)
      const dataToExport =
        searchTerm || statusFilter !== "all" ? filteredBookings : bookings;

      if (dataToExport.length === 0) {
        alert("No data to export!");
        return;
      }

      // Create CSV headers
      const headers = [
        "Reference ID",
        "Customer Name",
        "Email",
        "Phone",
        "Status",
        "Payment Status",
        "Amount Paid",
        "Appointment Date",
        "Appointment Time",
        "Address",
        "Created Date",
        "Notes",
      ];

      // Create CSV rows
      const rows = dataToExport.map((booking) => [
        booking.referenceId || "N/A",
        booking.name || "N/A",
        booking.email || "N/A",
        booking.phone || "N/A",
        booking.status || "N/A",
        booking.paymentStatus || "Not Paid",
        booking.paidAmount || "0",
        booking.appointmentDate
          ? formatDateForCSV(booking.appointmentDate)
          : "N/A",
        booking.appointmentTime || "N/A",
        booking.address || "N/A",
        booking.createdAt ? formatDateForCSV(booking.createdAt) : "N/A",
        booking.notes || "N/A",
      ]);

      // Combine headers and rows
      const csvContent = [headers, ...rows]
        .map((row) => row.map((field) => `"${field}"`).join(","))
        .join("\n");

      // Create and download file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `bookings_export_${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Show success message
    } catch (error) {
      console.error("Failed to export CSV:", error);
    } finally {
      setExporting(false);
    }
  };

  // Format date for CSV (simple format)
  const formatDateForCSV = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN");
  };

  // Export filtered data only
  const exportFilteredToCSV = () => {
    if (filteredBookings.length === 0) {
      alert("No filtered data to export!");
      return;
    }
    exportToCSV();
  };

  // Export all data
  const exportAllToCSV = () => {
    if (bookings.length === 0) {
      alert("No data to export!");
      return;
    }
    exportToCSV();
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      await API.patch(
        `/bookings/${bookingId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      // Update local state
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: newStatus }
            : booking
        )
      );

      // Recalculate stats
      calculateStats(
        bookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: newStatus }
            : booking
        )
      );
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      await API.delete(`/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      // Remove from local state
      setBookings((prev) =>
        prev.filter((booking) => booking._id !== bookingId)
      );

      // Recalculate stats
      calculateStats(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.error("Failed to delete booking:", error);
    }
  };

  // Filter and sort bookings
  const filteredBookings = bookings
    .filter((booking) => {
      const matchesSearch =
        booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.phone?.includes(searchTerm) ||
        booking.referenceId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (booking.address &&
          booking.address.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt || b.bookingDate) -
          new Date(a.createdAt || a.bookingDate)
        );
      } else if (sortBy === "oldest") {
        return (
          new Date(a.createdAt || a.bookingDate) -
          new Date(b.createdAt || b.bookingDate)
        );
      } else if (sortBy === "amount-high") {
        return (b.paidAmount || 0) - (a.paidAmount || 0);
      } else if (sortBy === "amount-low") {
        return (a.paidAmount || 0) - (b.paidAmount || 0);
      }
      return 0;
    });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="text-amber-500" size={16} />;
      case "Confirmed":
        return <CheckCircle className="text-blue-500" size={16} />;
      case "Completed":
        return <CheckCircle className="text-green-500" size={16} />;
      case "Cancelled":
        return <XCircle className="text-red-500" size={16} />;
      default:
        return <AlertCircle className="text-gray-500" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatAppointmentDate = (dateString, timeString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    const options = { year: "numeric", month: "short", day: "numeric" };

    if (timeString) {
      return `${date.toLocaleDateString(undefined, options)} at ${timeString}`;
    }

    return date.toLocaleDateString(undefined, options);
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/20 p-4 md:p-6">
      <div className="max-w-7xl mx-auto py-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Booking Management
            </h1>
            <p className="text-gray-500 mt-2">
              Manage and monitor all customer bookings
            </p>
          </div>

          <div className="flex items-center gap-2 mt-4 md:mt-0">
            {/* Auto Refresh Indicator */}
            <div className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200">
              <div
                className={`w-2 h-2 rounded-full ${
                  autoRefresh ? "bg-green-500 animate-pulse" : "bg-gray-400"
                }`}
              ></div>
              <span className="text-sm text-gray-600 hidden sm:inline">
                Auto-refresh {autoRefresh ? "ON" : "OFF"}
              </span>
            </div>

            <button
              onClick={fetchBookings}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                  <Settings size={18} />
                  <span className="hidden sm:inline">Settings</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="px-2 py-1.5 text-sm font-semibold">
                  Auto-refresh Settings
                </div>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5">
                  <div className="flex items-center justify-between space-y-0.5">
                    <Label htmlFor="auto-refresh" className="text-sm">
                      Auto Refresh
                    </Label>
                    <Switch
                      id="auto-refresh"
                      checked={autoRefresh}
                      onCheckedChange={setAutoRefresh}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <Label htmlFor="refresh-interval" className="text-sm">
                      Interval
                    </Label>
                    <select
                      id="refresh-interval"
                      value={refreshInterval}
                      onChange={(e) =>
                        setRefreshInterval(Number(e.target.value))
                      }
                      className="text-sm border rounded px-2 py-1"
                      disabled={!autoRefresh}
                    >
                      <option value={15}>15 seconds</option>
                      <option value={30}>30 seconds</option>
                      <option value={60}>1 minute</option>
                      <option value={300}>5 minutes</option>
                    </select>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="px-2 py-1.5 text-xs text-gray-500">
                  Last refreshed: {formatTimeAgo(lastRefreshed)}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {[
            {
              label: "Total Bookings",
              value: stats.total,
              icon: CalendarDays,
              color: "blue",
              trend: "+12% this week",
            },

            {
              label: "Total Revenue",
              value: `₹${stats.revenue.toLocaleString()}`,
              icon: IndianRupee,
              color: "purple",
              trend: "+15% this month",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    {stat.value}
                  </h3>
                </div>
                <div className={`rounded-full bg-${stat.color}-100 p-3`}>
                  <stat.icon className={`text-${stat.color}-600`} size={20} />
                </div>
              </div>
              <div
                className={`mt-3 flex items-center text-xs ${
                  stat.trend.includes("+") ? "text-green-600" : "text-gray-500"
                }`}
              >
                <TrendingUp size={12} className="mr-1" />
                <span>{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-gray-100/50 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name, email, phone, reference ID or address..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center bg-white/50 rounded-lg border border-gray-200 px-3 py-2">
                <Filter size={18} className="text-gray-400 mr-2" />
                <select
                  className="focus:outline-none bg-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center bg-white/50 rounded-lg border border-gray-200 px-3 py-2">
                <ArrowUpDown size={18} className="text-gray-400 mr-2" />
                <select
                  className="focus:outline-none bg-transparent"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="amount-high">Amount: High to Low</option>
                  <option value="amount-low">Amount: Low to High</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div className="flex items-center gap-3">
            <p className="text-gray-500 text-sm">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </p>
            {autoRefresh && (
              <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <RotateCw size={10} className="animate-spin" />
                Auto-refresh in {refreshInterval}s
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  disabled={exporting}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 bg-white px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download
                    size={14}
                    className={exporting ? "animate-spin" : ""}
                  />
                  {exporting ? "Exporting..." : "Export CSV"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={exportFilteredToCSV}
                  disabled={filteredBookings.length === 0}
                >
                  <Filter size={14} className="mr-2" />
                  Export Filtered ({filteredBookings.length} records)
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={exportAllToCSV}
                  disabled={bookings.length === 0}
                >
                  <Download size={14} className="mr-2" />
                  Export All ({bookings.length} records)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-10 text-center shadow-sm border border-gray-100/50">
            <div className="flex justify-center">
              <RefreshCw className="animate-spin text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mt-4">
              Loading bookings...
            </h3>
            <p className="text-gray-500">
              Please wait while we fetch your data
            </p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-10 text-center shadow-sm border border-gray-100/50">
            <Search size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              No bookings found
            </h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filter criteria"
                : "There are no bookings in the system yet"}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBookings.map((booking) => (
              <Card
                key={booking._id}
                className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
              >
                <div className="relative">
                  <div
                    className={`h-1 ${
                      getStatusColor(booking.status).split(" ")[0]
                    }`}
                  ></div>
                  <div className="absolute top-3 right-3">
                    <Badge
                      className={`${getStatusColor(
                        booking.status
                      )} flex items-center gap-1 border`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                        <User size={18} className="mr-2 text-gray-400" />
                        {booking.name}
                      </h2>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">
                          Created {formatTimeAgo(new Date(booking.createdAt))}
                        </span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 rounded-md hover:bg-gray-100 transition-colors">
                          <MoreVertical size={18} className="text-gray-400" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye size={16} className="mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit size={16} className="mr-2" />
                          Edit Booking
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => deleteBooking(booking._id)}
                        >
                          <Trash2 size={16} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-500 flex items-center">
                      <Hash size={14} className="mr-1" />
                      Booking ID
                    </div>
                    <div className="text-sm font-mono text-blue-700 font-semibold bg-blue-50 px-2 py-1 rounded">
                      {booking.bookingId}
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-gray-800 flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <IndianRupee size={20} />
                      {booking.paidAmount || "0"}
                    </div>
                    <div
                      className={`text-xs font-normal px-2 py-1 rounded-md border ${
                        booking.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-gray-100 text-gray-600 border-gray-200"
                      }`}
                    >
                      {booking.paymentStatus || "Not Paid"}
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-gray-100 pt-4 mt-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail size={16} className="mr-2 text-gray-400" />
                      <span className="truncate">{booking.email || "N/A"}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Phone size={16} className="mr-2 text-gray-400" />
                      {booking.phone || "N/A"}
                    </div>

                    <div className="text-sm text-gray-600">
                      <div className="font-medium mb-1 flex items-center">
                        <CalendarDays size={14} className="mr-1" />
                        Appointment
                      </div>
                      <div>
                        {formatAppointmentDate(
                          booking.appointmentDate,
                          booking.appointmentTime
                        )}
                      </div>
                    </div>

                    {booking.address && (
                      <div className="text-sm text-gray-600">
                        <div className="font-medium mb-1 flex items-center">
                          <MapPin size={14} className="mr-1" />
                          Address
                        </div>
                        <div className="truncate">{booking.address}</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
