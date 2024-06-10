import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Organization from './Organization';
import { dbDebug } from '../config/debugger';

class Client extends Model {
  public id!: number;
  public organizationId!: number;
  public msaValidFrom!: Date;
  public msaValidUpto!: Date;
  public legalName!: string;
  public ndaSignedOn!: Date;
  public shortName!: string;
  public ndaValidFrom!: Date;
  public ndaValidUpto!: Date;
  public addressId!: string;
  public displayName!: string;
  public isNdaSigned!: boolean;
  public isMsaSigned!: boolean;
  public msaSignedOn!: Date;
}

Client.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Organization,
        key: 'id',
      },
    },
    msaValidFrom: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    msaValidUpto: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    legalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ndaSignedOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    shortName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ndaValidFrom: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ndaValidUpto: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    addressId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isNdaSigned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    isMsaSigned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    msaSignedOn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'clients',
  }
);

export default Client;
