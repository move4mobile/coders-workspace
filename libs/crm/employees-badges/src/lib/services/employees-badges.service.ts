import { BadgeService } from '@crm/badge';
import { Badge, BadgeAwarded, EmployeeBadge } from '@crm/dto';
import { DataService } from '@crm/data';
import { Injectable } from '@nestjs/common';

const TAB_EMPLOYEE_BADGES = 'EmployeeBadges';

@Injectable()
export class EmployeesBadgesService {
  constructor(private data: DataService, private badgeService: BadgeService) {}

  async findAll(): Promise<EmployeeBadge[]> {
    return this.getEmployeeBadges();
  }

  async findAllByEmployeeId(employeeId: string): Promise<Badge[]> {
    const data = await this.getEmployeeBadges();
    const badges = await this.badgeService.findAll();

    return data.filter(e => e.employeeId === employeeId).map(e => badges.find(p => p.id === e.badgeId));
  }

  async getAwardedBadges() {
    const rows = await this.data.getSpreadsheetRows(TAB_EMPLOYEE_BADGES);
    return rows.map(row => BadgeAwarded.fromRow(row)).filter(e => e.employeeId);
  }

  private async getEmployeeBadges() {
    const rows = await this.data.getSpreadsheetRows(TAB_EMPLOYEE_BADGES);
    return rows.map(row => EmployeeBadge.fromRow(row)).filter(e => e.employeeId);
  }
}
