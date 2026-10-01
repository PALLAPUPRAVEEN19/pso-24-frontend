// Comprehensive mock data for PrecisionAuto Care

export const initialServices = [
  {
    id: "srv-1",
    name: "Full Synthetic Oil & Filter Service",
    category: "Maintenance",
    price: 89.99,
    duration: "45 mins",
    description: "Includes high-grade synthetic oil change, premium OEM filter replacement, and multi-point inspection."
  },
  {
    id: "srv-2",
    name: "Comprehensive Brake Inspection & Pad Replacement",
    category: "Safety & Brakes",
    price: 199.99,
    duration: "1.5 hours",
    description: "Front & rear brake pad replacement, rotor resurfacing/inspection, and brake fluid check."
  },
  {
    id: "srv-3",
    name: "Advanced Engine Computer Diagnostics",
    category: "Diagnostics",
    price: 75.00,
    duration: "1 hour",
    description: "Full OBD-II diagnostic scan, error code troubleshooting, and sensor health report."
  },
  {
    id: "srv-4",
    name: "3D Laser Wheel Alignment & Balancing",
    category: "Tires & Suspension",
    price: 119.50,
    duration: "1 hour",
    description: "Precision 4-wheel laser alignment, tire balancing, and suspension check."
  },
  {
    id: "srv-5",
    name: "HVAC Air Conditioning Service & Recharge",
    category: "Climate Control",
    price: 149.00,
    duration: "1.5 hours",
    description: "Refrigerant pressure test, system leak check, compressor oil refill, and cabin air filter renewal."
  },
  {
    id: "srv-6",
    name: "Major 50k / 100k Miles Maintenance Package",
    category: "Full Service",
    price: 349.99,
    duration: "3.5 hours",
    description: "Complete fluid flush (transmission, coolant, brake), spark plugs replacement, and 50-point safety audit."
  }
];

export const initialBookings = [
  {
    id: "BK-1001",
    customerName: "Eleanor Vance",
    customerEmail: "eleanor@example.com",
    customerPhone: "+1 (555) 234-5678",
    vehicle: "2022 BMW M340i",
    licensePlate: "7XYZ99",
    service: "Full Synthetic Oil & Filter Service",
    serviceId: "srv-1",
    date: "2026-09-14",
    timeSlot: "10:00 AM",
    status: "In Progress",
    technician: "Alex Rivera",
    technicianId: "tech-1",
    cost: 89.99,
    notes: "Customer reported slight squeak on startup.",
    createdAt: "2026-09-10"
  },
  {
    id: "BK-1002",
    customerName: "Marcus Sterling",
    customerEmail: "marcus@example.com",
    customerPhone: "+1 (555) 876-5432",
    vehicle: "2021 Audi Q7 Quattro",
    licensePlate: "AUDI-Q7",
    service: "Comprehensive Brake Inspection & Pad Replacement",
    serviceId: "srv-2",
    date: "2026-09-15",
    timeSlot: "02:00 PM",
    status: "Scheduled",
    technician: "Sarah Chen",
    technicianId: "tech-2",
    cost: 199.99,
    notes: "Front ceramic pads requested.",
    createdAt: "2026-09-11"
  },
  {
    id: "BK-1003",
    customerName: "David Miller",
    customerEmail: "david@example.com",
    customerPhone: "+1 (555) 345-6789",
    vehicle: "2023 Tesla Model Y",
    licensePlate: "EV-POWER",
    service: "3D Laser Wheel Alignment & Balancing",
    serviceId: "srv-4",
    date: "2026-09-12",
    timeSlot: "09:30 AM",
    status: "Ready for Delivery",
    technician: "Alex Rivera",
    technicianId: "tech-1",
    cost: 119.50,
    notes: "Check rear right tire alignment after pothole impact.",
    createdAt: "2026-09-08"
  },
  {
    id: "BK-1004",
    customerName: "Eleanor Vance",
    customerEmail: "eleanor@example.com",
    customerPhone: "+1 (555) 234-5678",
    vehicle: "2022 BMW M340i",
    licensePlate: "7XYZ99",
    service: "HVAC Air Conditioning Service & Recharge",
    serviceId: "srv-5",
    date: "2026-08-20",
    timeSlot: "11:00 AM",
    status: "Completed",
    technician: "Sarah Chen",
    technicianId: "tech-2",
    cost: 149.00,
    notes: "AC cooling restored to factory standards.",
    createdAt: "2026-08-18"
  },
  {
    id: "BK-1005",
    customerName: "Sophia Martinez",
    customerEmail: "sophia@example.com",
    customerPhone: "+1 (555) 901-2345",
    vehicle: "2020 Porsche Macan S",
    licensePlate: "PCAR-88",
    service: "Advanced Engine Computer Diagnostics",
    serviceId: "srv-3",
    date: "2026-09-16",
    timeSlot: "11:30 AM",
    status: "Scheduled",
    technician: "Alex Rivera",
    technicianId: "tech-1",
    cost: 75.00,
    notes: "Check engine light illuminated 2 days ago.",
    createdAt: "2026-09-12"
  }
];

export const initialTechnicians = [
  {
    id: "tech-1",
    name: "Alex Rivera",
    email: "tech@precisionauto.com",
    specialization: "German Performance & European Diagnostics",
    activeJobs: 2,
    rating: 4.9,
    status: "Available"
  },
  {
    id: "tech-2",
    name: "Sarah Chen",
    email: "sarah.tech@precisionauto.com",
    specialization: "Brake Systems & Hybrid/EV Electronics",
    activeJobs: 1,
    rating: 5.0,
    status: "In Service"
  },
  {
    id: "tech-3",
    name: "James Wilson",
    email: "james.tech@precisionauto.com",
    specialization: "Suspension, Alignment & Transmission",
    activeJobs: 0,
    rating: 4.8,
    status: "Available"
  }
];

export const initialInvoices = [
  {
    id: "INV-9901",
    bookingId: "BK-1004",
    customerName: "Eleanor Vance",
    customerEmail: "eleanor@example.com",
    technician: "Sarah Chen",
    technicianId: "tech-2",
    service: "HVAC Air Conditioning Service & Recharge",
    date: "2026-08-20",
    subtotal: 149.00,
    tax: 11.92,
    total: 160.92,
    status: "Paid",
    paymentMethod: "Credit Card (Visa **** 4821)"
  },
  {
    id: "INV-9902",
    bookingId: "BK-1003",
    customerName: "David Miller",
    customerEmail: "david@example.com",
    technician: "Alex Rivera",
    technicianId: "tech-1",
    service: "3D Laser Wheel Alignment & Balancing",
    date: "2026-09-12",
    subtotal: 119.50,
    tax: 9.56,
    total: 129.06,
    status: "Unpaid",
    paymentMethod: "Pending Payment"
  },
  {
    id: "INV-9903",
    bookingId: "BK-1001",
    customerName: "Eleanor Vance",
    customerEmail: "eleanor@example.com",
    technician: "Alex Rivera",
    technicianId: "tech-1",
    service: "Full Synthetic Oil & Filter Service",
    date: "2026-09-14",
    subtotal: 89.99,
    tax: 7.20,
    total: 97.19,
    status: "Unpaid",
    paymentMethod: "Pay Upon Pickup"
  }
];

export const dummyServiceHistoryLogs = [
  {
    id: "LOG-501",
    vehicle: "2022 BMW M340i",
    owner: "Eleanor Vance",
    serviceDate: "2026-05-10",
    serviceType: "Full Maintenance & Spark Plugs",
    technician: "Alex Rivera",
    mileage: "24,500 mi",
    status: "Completed",
    notes: "Replaced 6 OEM iridium plugs, cleaned intake valves."
  },
  {
    id: "LOG-502",
    vehicle: "2022 BMW M340i",
    owner: "Eleanor Vance",
    serviceDate: "2025-11-15",
    serviceType: "Front Brake Disc & Pad Renewal",
    technician: "Sarah Chen",
    mileage: "18,200 mi",
    status: "Completed",
    notes: "Brembo high performance pads installed."
  },
  {
    id: "LOG-503",
    vehicle: "2021 Audi Q7 Quattro",
    owner: "Marcus Sterling",
    serviceDate: "2026-03-22",
    serviceType: "Transmission Fluid Service",
    technician: "James Wilson",
    mileage: "36,000 mi",
    status: "Completed",
    notes: "ZF 8-speed fluid flush and filter tray replacement."
  }
];
