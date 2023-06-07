export class CostClass {
  static RESOURCES_LIST = [
    { id: 2, title: 'PM' },
    { id: 1, title: 'Developer' },
    { id: 3, title: 'QA' },
  ];

  static TREE_DATA_OF_RESOURCES = {
    DEVELOPER: {
      'Almond Meal flour': null,
      'Organic eggs': null,
      'Protein Powder': null,
      Fruits: {
        Apple: null,
        Berries: ['Blueberry', 'Raspberry'],
        Orange: null,
      },
    },
    Reminders: [
      'Cook dinner',
      'Read the Material Design spec',
      'Upgrade Application to Angular',
    ],
  };
}
