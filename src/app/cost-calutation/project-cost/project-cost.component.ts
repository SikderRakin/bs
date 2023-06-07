import { Component, OnInit } from '@angular/core';
import { CostClass } from '../constant/constant';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatTreeModule } from '@angular/material/tree';

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

const TREE_DATA: ResourceNode[] = [
  {
    name: 'Developer',
    id: 1,
    cost: 1000,
    children: [{ id: 3, cost: 500, name: 'QA' }],
  },
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

@Component({
  selector: 'app-project-cost',
  templateUrl: './project-cost.component.html',
  styleUrls: ['./project-cost.component.css'],
})
export class ProjectCostComponent implements OnInit {
  treeControl = new NestedTreeControl<ResourceNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<ResourceNode>();

  resourceList: any[] = [];

  developerCost: number = 0;
  pmCost: number = 0;
  qaCost: number = 0;

  constructor() {}
  hasChild = (_: number, node: ResourceNode) =>
    !!node.children && node.children.length > 0;
  ngOnInit(): void {
    this.dataSource.data = TREE_DATA;
    this.resourceList = CostClass.RESOURCES_LIST;
  }

  onChecked(node: any, event: any) {
    if (event.checked) {
      if (node.id == 1) {
        this.calculateDeveloper(node.cost, 'add');
      } else if (node.id == 2) {
        this.calculateQa(node.cost, 'add');
      } else if (node.id == 3) {
        this.calculateQa(node.cost, 'add');
      }
    } else {
      if (node.id == 1) {
        this.calculateDeveloper(node.cost, 'sub');
      } else if (node.id == 2) {
        this.calculateQa(node.cost, 'sub');
      } else if (node.id == 3) {
        this.calculateQa(node.cost, 'sub');
      }
    }
  }

  calculateDeveloper(cost: number, action: string) {
    if (action === 'add') {
      this.developerCost = this.developerCost + cost;
    } else {
      this.developerCost = this.developerCost - cost;
    }
  }
  calculateQa(cost: number, action: string) {
    if (action === 'add') {
      this.qaCost = this.qaCost + cost;
    } else {
      this.qaCost = this.qaCost - cost;
    }
  }
  calculatePm(cost: number, action: string) {
    if (action === 'add') {
      this.pmCost = this.pmCost + cost;
    } else {
      this.pmCost = this.pmCost - cost;
    }
  }

  totalCost() {
    return this.pmCost + this.qaCost + this.developerCost;
  }
}
