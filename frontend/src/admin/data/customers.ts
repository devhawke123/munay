import type { CustomerRow } from "../types/customer";

export const customers: CustomerRow[] = [
  { id: "1", name: "Michael Brown", email: "michael@example.com", phone: "+1 202-555-0143", location: "Austin, TX, USA" },
  { id: "2", name: "Sofia Mendez", email: "sofia.mendez@example.com", phone: "+1 415-555-0118", location: "San Francisco, CA, USA" },
  { id: "3", name: "Marie Dupont", email: "marie.dupont@example.com", phone: "+33 1 42 68 53 00", location: "Paris, France" },
  { id: "4", name: "Yuki Tanaka", email: "yuki.tanaka@example.com", phone: "+81 3-1234-5678", location: "Tokyo, Japan" },
  { id: "5", name: "Clara Hoffmann", email: "clara.hoffmann@example.com", phone: "+49 30 12345678", location: "Berlin, Germany" },
  { id: "6", name: "Amara Osei", email: "amara.osei@example.com", phone: "+233 24 123 4567", location: "Accra, Ghana" },
  { id: "7", name: "Liam O'Connor", email: "liam.oconnor@example.com", phone: "+353 1 234 5678", location: "Dublin, Ireland" },
];

export function getCustomer(id: string): CustomerRow {
  return customers.find((c) => c.id === id) ?? customers[0];
}
