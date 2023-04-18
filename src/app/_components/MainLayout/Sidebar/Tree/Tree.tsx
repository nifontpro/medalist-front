import TreeNode from '../TreeNode/TreeNode';
import { TreeProps } from './Tree.props';

const Tree = ({ treeData }: TreeProps): JSX.Element => {
  return (
    <>
      {treeData?.map((node) => {
        return <TreeNode key={node.id} node={node} />;
      })}
    </>
  );
};

export default Tree;
