export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  postal_code: number;
  depart_at: string;
  depart_vehicle_type: string;
  depart_flight_number: string;
  depart_airline: string;
  depart_train_name: string;
  return_at: string;
  return_vehicle_type: string;
  return_flight_number: string;
  return_airline: string;
  return_train_name: string;
  qr_link: string;
  seat_table: string;
};

export type GetUserByEmailResponse = {
  data: UserProfile[];
};