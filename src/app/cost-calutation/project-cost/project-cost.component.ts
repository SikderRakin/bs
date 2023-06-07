import { Component, OnInit, ViewChild } from '@angular/core';
import { CostClass } from '../constant/constant';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTreeModule } from '@angular/material/tree';
import { ServiceService } from 'src/app/service.service';
import { Subject, takeUntil } from 'rxjs';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface ResourceNode {
  name: string;
  id: number;
  cost: number;
  children?: ResourceNode[];
}

const PM_DATA: ResourceNode[] = [
  {
    name: 'PM',
    id: 2,
    cost: 300,
    children: [
      {
        name: 'Developer',
        id: 1,
        cost: 1000,
        children: [{ id: 3, cost: 500, name: 'QA' }],
      },
      { id: 3, cost: 500, name: 'QA' },
    ],
  },
  { id: 3, cost: 500, name: 'QA' },
];

const QA_DATA: ResourceNode[] = [
  {
    name: 'QA',
    id: 1,
    cost: 1000,
  },
];

const DEVELOPER_DATA: ResourceNode[] = [
  {
    name: 'Developer',
    id: 1,
    cost: 1000,
    children: [{ id: 3, cost: 500, name: 'QA' }],
  },
];

@Component({
  selector: 'app-project-cost',
  templateUrl: './project-cost.component.html',
  styleUrls: ['./project-cost.component.css'],
})
export class ProjectCostComponent implements OnInit {
  treeControl = new NestedTreeControl<ResourceNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<ResourceNode>();
  @ViewChild('treeSelector') tree: any;
  private unsubscribe$ = new Subject<void>();
  resourceList: any[] = [];

  developerCost: number = 0;
  pmCost: number = 0;
  qaCost: number = 0;
  total: number = 0;
  constructor(private serviceService: ServiceService) {
    this.dataSource.data = PM_DATA;
  }

  hasChild = (_: number, node: ResourceNode) =>
    !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.resourceList = CostClass.RESOURCES_LIST;
    this.serviceService.dataSubject
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        // Handle the received data here
        if (data === 'reset') {
          this.totalCost(data);
        }
      });
  }
  onChange() {
    // Perform the necessary changes to the data source here
    // For example, update the TREE_DATA array with new data

    // Call renderNodeChanges() to re-render the tree
    this.tree.renderNodeChanges(this.dataSource.data);
  }
  loadTreeDataByButton(value: any) {
    switch (value) {
      case 1:
        this.dataSource.data = [...DEVELOPER_DATA];
        break;
      case 2:
        this.dataSource.data = [...PM_DATA];
        this.tree.renderNodeChanges(this.dataSource.data);
        break;
      case 3:
        this.dataSource.data = [...QA_DATA];
        this.tree.renderNodeChanges(this.dataSource.data);
        break;
      default:
        break;
    }
  }

  // calculate cost  when checked
  onChecked(node: any, event: any) {
    if (event.checked) {
      switch (node.id) {
        case 1:
          this.calculateDeveloper(node.cost, 'add');
          break;
        case 2:
          this.calculateQa(node.cost, 'add');
          break;
        case 3:
          this.calculateQa(node.cost, 'add');
          break;
        default:
          break;
      }
    } else {
      switch (node.id) {
        case 1:
          this.calculateDeveloper(node.cost, 'sub');
          break;
        case 2:
        case 3:
          this.calculateQa(node.cost, 'sub');
          break;
        default:
          break;
      }
    }
  }

  calculateDeveloper(cost: number, action: string) {
    if (action === 'add') {
      this.developerCost = this.developerCost + cost;
    } else {
      this.developerCost = this.developerCost - cost;
    }
    this.totalCost();
  }

  calculateQa(cost: number, action: string) {
    if (action === 'add') {
      this.qaCost = this.qaCost + cost;
    } else {
      this.qaCost = this.qaCost - cost;
    }
    this.totalCost();
  }

  calculatePm(cost: number, action: string) {
    if (action === 'add') {
      this.pmCost = this.pmCost + cost;
    } else {
      this.pmCost = this.pmCost - cost;
    }
    this.totalCost();
  }

  totalCost(action?: string) {
    if (action === 'reset') {
      this.pmCost = 0;
      this.qaCost = 0;
      this.developerCost = 0;
      this.total = 0;
    }
    this.total = this.pmCost + this.qaCost + this.developerCost;
  }
}
