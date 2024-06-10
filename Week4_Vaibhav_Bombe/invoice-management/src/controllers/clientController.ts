import { Request, Response } from 'express';
import models from '../models';
import { appDebug, dbDebug } from '../config/debugger';

const { Client, OrganizationClient } = models;

export const createClient = async (req: Request, res: Response) => {
  try {
    const { organizations, ...clientData } = req.body;
    const client = await Client.create(clientData);

    if (organizations && organizations.length > 0) {
      for (const organizationId of organizations) {
        await OrganizationClient.create({ organizationId, clientId: client.id });
      }
    }

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.findAll({
      include: {
        model: models.Organization,
        through: { attributes: [] },
      },
    });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
