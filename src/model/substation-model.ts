import { Substation } from "@prisma/client";

export type SubstationResponse = {
  id: number;
  name: string;
  address: string;
  contact: string;
  ip_address: string;
  dcc: string;
};

export type CreateSubstationRequest = {
  name: string;
  address: string;
  contact: string;
  ip_address: string;
  dcc: string;
};

export type UpdateSubstationRequest = {
  id: number;
  name: string;
  address: string;
  contact: string;
  ip_address: string;
  dcc: string;
};

export type SearchSubstationRequest = {
  name?: string;
  address?: string;
  contact?: string;
  ip_address?: string;
  dcc?: string;
  page: number;
  size: number;
};

export function toSubstationResponse(
  substation: Substation
): SubstationResponse {
  return {
    id: substation.id,
    name: substation.name,
    address: substation.address,
    contact: substation.contact,
    ip_address: substation.ip_address,
    dcc: substation.dcc,
  };
}
