import { Request, Response, NextFunction } from "express";
import {
  CreateSubstationRequest,
  SearchSubstationRequest,
  UpdateSubstationRequest,
} from "../model/substation-model";
import { SubstationService } from "../service/substation-services";

export class SubstationController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateSubstationRequest =
        req.body as CreateSubstationRequest;
      const response = await SubstationService.create(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const substationId = Number(req.params.substationId);
      const response = await SubstationService.get(substationId);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateSubstationRequest =
        req.body as UpdateSubstationRequest;
      request.id = Number(req.params.substationId);

      const response = await SubstationService.update(request);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const substationId = Number(req.params.substationId);

      const response = await SubstationService.remove(substationId);
      res.status(200).json({
        data: "OK",
      });
    } catch (e) {
      next(e);
    }
  }

  static async search(req: Request, res: Response, next: NextFunction) {
    try {
      const request: SearchSubstationRequest = {
        name: req.query.name as string,
        address: req.query.address as string,
        contact: req.query.contact as string,
        ip_address: req.query.ip_address as string,
        dcc: req.query.dcc as string,
        page: req.query.page ? Number(req.query.page) : 1,
        size: req.query.size ? Number(req.query.size) : 10,
      };

      const response = await SubstationService.search(request);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
