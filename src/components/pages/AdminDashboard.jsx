import { useEffect, useState } from "react";
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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  useEffect(() => {
    fetchBookings();
  }, []);

  // Function to generate a reference ID (LB + random 4-digit number)
  const generateReferenceId = () => {
    return `LB${Math.floor(1000 + Math.random() * 9000)}`;
  };

  const fetchBookings = async () => {
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

      // Calculate stats
      calculateStats(bookingsWithRef);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

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
        return "bg-amber-100 text-amber-800";
      case "Confirmed":
        return "bg-blue-100 text-blue-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
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
            <button
              onClick={fetchBookings}
              className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={18} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus size={18} />
              <span className="hidden sm:inline">New Booking</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Bookings</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {stats.total}
                </h3>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <CalendarDays className="text-blue-600" size={20} />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs text-green-600">
              <TrendingUp size={14} className="mr-1" />
              <span>+12% this week</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Pending</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {stats.pending}
                </h3>
              </div>
              <div className="rounded-full bg-amber-100 p-3">
                <Clock className="text-amber-600" size={20} />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">Needs attention</div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Confirmed</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {stats.confirmed}
                </h3>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <CheckCircle className="text-blue-600" size={20} />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Upcoming appointments
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completed</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {stats.completed}
                </h3>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="text-green-600" size={20} />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs text-green-600">
              <TrendingUp size={14} className="mr-1" />
              <span>+8% this month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <h3 className="text-2xl font-bold text-gray-800">
                  ₹{stats.revenue.toLocaleString()}
                </h3>
              </div>
              <div className="rounded-full bg-purple-100 p-3">
                <IndianRupee className="text-purple-600" size={20} />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs text-green-600">
              <TrendingUp size={14} className="mr-1" />
              <span>+15% this month</span>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name, email, phone, reference ID or address..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center bg-white rounded-lg border border-gray-200 px-3 py-2">
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

              <div className="flex items-center bg-white rounded-lg border border-gray-200 px-3 py-2">
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

        {/* Results Count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-500 text-sm">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </p>
          <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
            <Download size={16} />
            Export CSV
          </button>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-gray-100">
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
          <div className="bg-white rounded-xl p-10 text-center shadow-sm border border-gray-100">
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
                className="overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div
                  className={`h-2 ${
                    getStatusColor(booking.status).split(" ")[0]
                  }`}
                ></div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                        <User size={18} className="mr-2 text-gray-400" />
                        {booking.name}
                      </h2>
                      <div className="flex items-center mt-2">
                        <Badge
                          className={`${getStatusColor(
                            booking.status
                          )} flex items-center gap-1 border-0`}
                        >
                          {getStatusIcon(booking.status)}
                          {booking.status}
                        </Badge>
                        <span className="text-xs text-gray-500 ml-2">
                          {formatDate(booking.createdAt)}
                        </span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 rounded-md hover:bg-gray-100">
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
                      Reference ID
                    </div>
                    <div className="text-sm font-mono text-blue-700 font-semibold">
                      {booking.referenceId}
                    </div>
                  </div>

                  <div className="text-2xl font-bold text-gray-800 flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <IndianRupee size={20} />
                      {booking.paidAmount || "0"}
                    </div>
                    <div
                      className={`text-xs font-normal px-2 py-1 rounded-md ${
                        booking.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
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

                  {booking.status !== "Completed" &&
                    booking.status !== "Cancelled" && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="text-sm font-medium text-gray-700 mb-2">
                          Update Status
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {[
                            "Pending",
                            "Confirmed",
                            "Completed",
                            "Cancelled",
                          ].map((status) => (
                            <button
                              key={status}
                              onClick={() =>
                                updateBookingStatus(booking._id, status)
                              }
                              className={`text-xs px-2 py-1 rounded ${
                                booking.status === status
                                  ? getStatusColor(status) + " font-medium"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
