import { Field, ID, ObjectType } from '@nestjs/graphql';
import { lowerCase, parseBoolean, parseNumber } from '../utils';

enum FieldMapping {
  ID = 'ID',
  NAME = 'Name',
  KEY = 'Key',
  CATEGORY = 'Category',
  DEGREE = 'Degree', // bronze, silver, gold
  IMAGE_URL = 'Image',
  DESCRIPTION = 'Description',
  MESSAGE = 'Message',
  NOTE = 'Note',
  ALLOW_MULTIPLE = 'AllowMultiple',
  ACTIVE = 'Available',
}

@ObjectType({ description: 'badge ' })
export class Badge {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  key: string;

  @Field()
  category: string;

  @Field()
  degree: string;

  @Field()
  description: string;

  @Field()
  message: string;

  @Field()
  imageUrl: string;

  multipleAllowed: boolean;

  active: boolean;

  static fromRow(data) {
    const obj = Object.assign(new Badge(), <Partial<Badge>>{
      id: parseNumber(data[FieldMapping.ID] + ''),
      name: data[FieldMapping.NAME],
      key: data[FieldMapping.KEY],
      category: data[FieldMapping.CATEGORY],
      degree: data[FieldMapping.DEGREE],
      message: data[FieldMapping.MESSAGE],
      description: data[FieldMapping.DESCRIPTION],
      imageUrl: getBadgeImageUrl(data),
      multipleAllowed: parseBoolean(data[FieldMapping.ACTIVE]) || false,
      active: parseBoolean(data[FieldMapping.ACTIVE]),
    });

    return obj;
  }
}

// docummentation for badge image url
// https://shields.io/
function getBadgeImageUrl(row) {
  let color = 'success';
  switch (row[FieldMapping.DEGREE]) {
    case 'bronze':
      color = 'yellowgreen';
      break;
    case 'silver':
      color = 'lightgrey';
      break;
    case 'gold':
      color = 'yellow';
      break;
  }
  const label = lowerCase(row[FieldMapping.NAME]);
  const message = row[FieldMapping.DESCRIPTION];

  return `https://img.shields.io/static/v1?label=${label}&message=${message}&color=${color}`;
}
