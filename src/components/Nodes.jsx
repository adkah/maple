import {
  Handle,
  Position,
} from 'reactflow';
import { TreeHandle, MovementHandle } from './Handles';

export function TreeNode(props){
  console.log(props.id)
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

    <TreeHandle type='target' position={Position.Top}/>
    <MovementHandle type='target' position={Position.Bottom} id={props.id}/>
    <TreeHandle type='source' position={Position.Bottom}/>
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