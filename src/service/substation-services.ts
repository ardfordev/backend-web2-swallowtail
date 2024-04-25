import {
  CreateSubstationRequest,
  SearchSubstationRequest,
  SubstationResponse,
  UpdateSubstationRequest,
  toSubstationResponse,
} from "../model/substation-model";
import { Validation } from "../validation/validation";
import { SubstationValidation } from "../validation/substation-validation";
import { prismaClient } from "../application/database";
import { Substation } from "@prisma/client";
import { ResponseError } from "../error/response-error";
import { Pageable } from "../model/page";

export class SubstationService {
  static async create(
    request: CreateSubstationRequest
  ): Promise<SubstationResponse> {
    const createRequest = Validation.validate(
      SubstationValidation.CREATE,
      request
    );

    const substation = await prismaClient.substation.create({
      data: createRequest,
    });

    return toSubstationResponse(substation);
  }

  static async checkSubstationMustExists(id: number): Promise<Substation> {
    const substation = await prismaClient.substation.findFirst({
      where: {
        id: id,
      },
    });

    if (!substation) {
      throw new ResponseError(404, "Substation is not found");
    }

    return substation;
  }

  static async get(id: number): Promise<SubstationResponse> {
    const substation = await this.checkSubstationMustExists(id);

    return toSubstationResponse(substation);
  }

  static async update(
    request: UpdateSubstationRequest
  ): Promise<SubstationResponse> {
    const updateRequest = Validation.validate(
      SubstationValidation.UPDATE,
      request
    );
    await this.checkSubstationMustExists(updateRequest.id);

    const substation = await prismaClient.substation.update({
      where: {
        id: updateRequest.id,
      },
      data: updateRequest,
    });

    return toSubstationResponse(substation);
  }

  static async remove(id: number): Promise<SubstationResponse> {
    await this.checkSubstationMustExists(id);

    const substation = await prismaClient.substation.delete({
      where: {
        id: id,
      },
    });

    return toSubstationResponse(substation);
  }

  static async search(
    request: SearchSubstationRequest
  ): Promise<Pageable<SubstationResponse>> {
    const searchRequest = Validation.validate(
      SubstationValidation.SEARCH,
      request
    );
    const skip = (searchRequest.page - 1) * searchRequest.size;

    const filters = [];
    // check if name exists
    if (searchRequest.name) {
      filters.push({
        name: {
          contains: searchRequest.name,
        },
      });
    }
    // check if address exists
    if (searchRequest.address) {
      filters.push({
        address: {
          contains: searchRequest.address,
        },
      });
    }
    // check if contact exists
    if (searchRequest.contact) {
      filters.push({
        contact: {
          contains: searchRequest.contact,
        },
      });
    }
    // check if ip_address exists
    if (searchRequest.ip_address) {
      filters.push({
        ip_address: {
          contains: searchRequest.ip_address,
        },
      });
    }
    // check if dcc exists
    if (searchRequest.dcc) {
      filters.push({
        dcc: {
          contains: searchRequest.dcc,
        },
      });
    }

    const substation = await prismaClient.substation.findMany({
      where: {
        AND: filters,
      },
      take: searchRequest.size,
      skip: skip,
    });

    const total = await prismaClient.substation.count({
      where: {
        AND: filters,
      },
    });

    return {
      data: substation.map((contact) => toSubstationResponse(contact)),
      paging: {
        current_page: searchRequest.page,
        total_page: Math.ceil(total / searchRequest.size),
        size: searchRequest.size,
      },
    };
  }
}
