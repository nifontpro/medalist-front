// import { sortTree } from './sortTree';

// describe('sortTree', () => {
//   it('should return undefined if the tree is undefined', () => {
//     const result = sortTree(undefined, 1);
//     expect(result).toBeUndefined();
//   });

//   it('should return an empty array if the tree is empty', () => {
//     const result = sortTree([], 1);
//     expect(result).toEqual([]);
//   });

//   it('should return an array with the root node if the tree has only one node', () => {
//     const tree = [{ id: 1, name: 'Root', parentId: null }];
//     const result = sortTree(tree, 1);
//     expect(result).toEqual([{ id: 1, name: 'Root' }]);
//   });

//   it('should return the sorted tree with children nodes', () => {
//     const tree = [
//       { id: 1, name: 'Root', parentId: null },
//       { id: 2, name: 'Child 1', parentId: 1 },
//       { id: 3, name: 'Child 2', parentId: 1 },
//       { id: 4, name: 'Grandchild 1', parentId: 2 },
//       { id: 5, name: 'Grandchild 2', parentId: 2 },
//     ];
//     const result = sortTree(tree, 1);
//     expect(result).toEqual([
//       {
//         id: 1,
//         name: 'Root',
//         children: [
//           {
//             id: 2,
//             name: 'Child 1',
//             children: [
//               { id: 4, name: 'Grandchild 1' },
//               { id: 5, name: 'Grandchild 2' },
//             ],
//           },
//           { id: 3, name: 'Child 2' },
//         ],
//       },
//     ]);
//   });
// });
