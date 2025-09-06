import {
  Handle,
  Position,
} from 'reactflow';
import { TreeHandle, MovementHandle, TriangleHandle } from './Handles';

export function TreeNode(props) {
  return (
    <>
      <div
        className='tree-node'
        style={{
          color: props.selected
            ? props.data.label === ''
              ? '#78aecf'
              : '#2e95d3'
            : props.data.label === ''
              ? '#b3b3b3'
              : ''
        }}
      >
        <div
          className='node-text'
          spellCheck="false"
        >
          <div className='animated'>
            {props.data.label === '' ? '<>' : props.data.label}
          </div>
        </div>

        <TreeHandle type='target' position={Position.Top} />
        <MovementHandle type='target' position={Position.Bottom} id={props.id} />
        <TreeHandle type='source' position={Position.Bottom} />
      </div>
    </>
  );
}

export function TriangleNode(props) {
  return (
    <>
      <div
        className='tree-node'
        style={{
          color: props.selected
            ? '#2e95d3'
            : ''
        }}
      >
        <div
          className='node-text'
          spellCheck="false"
        >
          <div className='animated'>
            {props.data.label}
          </div>
        </div>

        <TreeHandle type='target' position={Position.Top} />
        <MovementHandle type='target' position={Position.Bottom} id={props.id} />
        <TreeHandle type='source' position={Position.Bottom} />

        <TriangleHandle type='target' position={Position.Left} id={props.id + 'lefttriangle'} />
        <TriangleHandle type='source' position={Position.Left} id={props.id + 'lefttrianglesource'} />
        <TriangleHandle type='target' position={Position.Right} id={props.id + 'righttriangle'} />
      </div>
    </>
  );
}