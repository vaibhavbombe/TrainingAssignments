import { Request, Response } from 'express';
import models from '../models';
import { appDebug, dbDebug } from '../config/debugger';

const { Organization, OrganizationClient } = models;

export const createOrganization = async (req: Request, res: Response): Promise<void> => {
  try {
    const { clients, ...organizationData } = req.body;
    const organization = await Organization.create(organizationData);

    if (clients && clients.length > 0) {
      for (const clientId of clients) {
        await OrganizationClient.create({ organizationId: organization.id, clientId });
      }
    }

    res.status(201).json({ success: true, data: organization });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getOrganizations = async (req: Request, res: Response): Promise<void> => {
  try {
    const organizations = await Organization.findAll({
      include: {
        model: models.Client,
        through: { attributes: [] },
      },
    });
    res.status(200).json({ success: true, data: organizations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getOrganizationById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const organization = await Organization.findByPk(id, {
      include: {
        model: models.Client,
        through: { attributes: [] },
      },
    });
    if (!organization) {
      res.status(404).json({ success: false, error: 'Organization not found' });
      return;
    }
    res.status(200).json({ success: true, data: organization });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
