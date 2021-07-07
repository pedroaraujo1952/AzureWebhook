import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendReleaseDeploymentStatusService } from '../services/SendReleaseDeploymentStatusService';

import { ReleaseDeploymentComplete } from '../types/Azure/IReleaseDeploymentComplete';

export class ReleaseBuildController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { detailedMessage: message, resource } =
      request.body as ReleaseDeploymentComplete;

    const sendBuildStatus = container.resolve(
      SendReleaseDeploymentStatusService,
    );

    await sendBuildStatus.execute({ message, resource });

    return response.status(204).send();
  }
}
