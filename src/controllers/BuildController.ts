import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendBuildStatusService } from '../services/SendBuildStatusService';

import { BuildCompleted } from '../types/Azure/IBuildCompleted';

export class BuildController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { message, resource } = request.body as BuildCompleted;

    const sendBuildStatus = container.resolve(SendBuildStatusService);

    await sendBuildStatus.execute({ message, resource });

    return response.status(204).send();
  }
}
