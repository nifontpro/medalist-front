import { TreeNodeProps } from './TreeNode.props';
import TreeItem from '@mui/lab/TreeItem';
import Tree from '../Tree/Tree';
import styles from './TreeNode.module.scss';
import EditIcon from '@/icons/edit.svg';
import { ImageDefault } from '@/ui/ImageDefault/ImageDefault';

const TreeNode = ({ node }: TreeNodeProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <TreeItem nodeId={String(node.id)} label={node.name}>
        {node.children && <Tree treeData={node.children} />}
      </TreeItem>

      {/* <ImageDefault
          src={EditIcon}
          alt=''
          width={24}
          height={24}
          className={styles.edit}
        /> */}
    </div>
  );
};

export default TreeNode;
