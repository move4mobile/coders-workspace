import { NgModule } from '@angular/core';

import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { JoinApplicationButtonComponent } from './shared/components/join-application-button/join-application-button.component';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { BadgeComponent } from './shared/components/badge/badge.component';
import { MessageBoxComponent } from './shared/components/message-box/message-box.component';
import { UcfirstPipe } from './core/pipes/ucfirst.pipe';
import { BadgesCountComponent } from './shared/components/badges-count/badges-count.component';


const materialModules = [
    MatSliderModule, 
    MatToolbarModule, 
    MatSidenavModule, 
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatBadgeModule,
    MatDividerModule,
    MatExpansionModule
];

const components = [
    BadgeComponent,
    MessageBoxComponent,
    JoinApplicationButtonComponent,
    BadgesCountComponent
]

@NgModule({
    declarations: [
        ...components,
        UcfirstPipe,
    ],
    imports: [
        CommonModule,
        
        ...materialModules,
    ],
    providers: [],
    bootstrap: [],
    exports: [
        ...materialModules,

        // Components
        ...components,

        // Pipes
        UcfirstPipe,
    ]
  })
  export class UiModule {}