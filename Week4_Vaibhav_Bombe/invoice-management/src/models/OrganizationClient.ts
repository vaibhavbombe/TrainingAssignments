import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Organization from './Organization';
import Client from './Client';
import { dbDebug } from '../config/debugger';

class OrganizationClient extends Model {
  public organizationId!: number;
  public clientId!: number;
}

OrganizationClient.init(
  {
    organizationId: {
      type: DataTypes.INTEGER,
      references: {
        model: Organization,
        key: 'id',
      },
    },
    clientId: {
      type: DataTypes.INTEGER,
      references: {
        model: Client,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'organization_clients',
  }
);

export default OrganizationClient;
