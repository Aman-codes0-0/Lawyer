// API Service for react-frontend to handle backend calls or graceful mock fallbacks

export async function fetchAppointments() {
  try {
    const res = await fetch("/api/appointments");
    if (!res.ok) throw new Error("Failed to fetch appointments");
    return await res.json();
  } catch (err) {
    console.warn("Using local appointment storage:", err);
    const saved = localStorage.getItem("lexprime_appointments");
    return saved ? JSON.parse(saved) : [];
  }
}

export async function createAppointment(data: any) {
  try {
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("API offline, storing appointment locally", e);
  }
  const saved = localStorage.getItem("lexprime_appointments");
  const list = saved ? JSON.parse(saved) : [];
  const newItem = {
    id: "apt_" + Date.now(),
    clientName: data.name,
    email: data.email,
    phone: data.phone,
    caseType: data.caseType || "General Consultation",
    preferredDate: data.date || new Date().toISOString(),
    preferredTime: data.time || "morning",
    message: data.message,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };
  list.unshift(newItem);
  localStorage.setItem("lexprime_appointments", JSON.stringify(list));
  return newItem;
}

export async function fetchEnquiries() {
  try {
    const res = await fetch("/api/enquiries");
    if (!res.ok) throw new Error("Failed to fetch enquiries");
    return await res.json();
  } catch (err) {
    console.warn("Using local enquiry storage:", err);
    const saved = localStorage.getItem("lexprime_enquiries");
    return saved ? JSON.parse(saved) : [];
  }
}

export async function createEnquiry(data: any) {
  try {
    const res = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn("API offline, storing enquiry locally", e);
  }
  const saved = localStorage.getItem("lexprime_enquiries");
  const list = saved ? JSON.parse(saved) : [];
  const newItem = {
    id: "enq_" + Date.now(),
    name: data.email.split("@")[0] || "Client",
    email: data.email,
    phone: data.phone || "",
    subject: data.subject || "Support Query",
    message: data.message,
    status: "UNREAD",
    createdAt: new Date().toISOString(),
  };
  list.unshift(newItem);
  localStorage.setItem("lexprime_enquiries", JSON.stringify(list));
  return newItem;
}
