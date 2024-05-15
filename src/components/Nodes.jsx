import {
  Handle,
  Position,
} from 'reactflow';
import MovementHandle from './Handles';

export function TreeNode(props){
  return (
    <>
    <div
    className='tree-node'
    >
    <div
    className='node-text'
    contentEditable='true'
    suppressContentEditableWarning={true}
    spellCheck="false"
    >
    <div className = 'animated'>
    {props.data.label}
    </div>
    </div>

    <MovementHandle type='target' position={Position.Top}/>
    <MovementHandle type='source' position={Position.Bottom}/>
    </div>
    </>
  );
}

export function NodePreview(props){
    return (
        <div className='node-preview nodrag'>
          <div
          className='node-text'
          >
          XP
          </div>
          <Handle type='target' position={Position.Top}/>
        </div>
    );
}