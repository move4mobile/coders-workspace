import { parseDate, parseNumber, parseString } from '../utils';
import { Field, ObjectType } from '@nestjs/graphql';
import { GoogleSpreadsheetRow } from './google-spreadsheet-row';

enum FieldMapping {
  EMPLOYEE = 'Employee',
  EMPLOYEE_ID = 'EmployeeId',
  BADGE = 'Badge',
  BADGE_ID = 'BadgeId',
  AWARDED_COUNT = 'AwardedCount',
  AWARDED_DATE = 'AwardedDate',
}

@ObjectType({ description: 'employee badge ' })
export class BadgeAwarded {
  @Field()
  employeeId!: string;

  // @Field(() => Employee)
  // employee: Employee;

  @Field(() => Number)
  badgeId!: number;

  // @Field(() => Badge)
  // badge: Badge;

  @Field()
  awarded!: number;

  @Field({ nullable: true })
  awardedDate?: Date;

  static fromRow(data: GoogleSpreadsheetRow) {
    const obj = Object.assign(new BadgeAwarded(), <Partial<BadgeAwarded>>{
      employeeId: parseString(data[FieldMapping.EMPLOYEE_ID]),
      badgeId: parseNumber(data[FieldMapping.BADGE_ID]),
      awarded: parseNumber(data[FieldMapping.AWARDED_COUNT] || 0),
      awardedDate: data[FieldMapping.AWARDED_DATE] ? parseDate(data[FieldMapping.AWARDED_DATE]) : undefined,
    });

    return obj;
  }
}
