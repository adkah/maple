import {
  Handle,
} from 'reactflow';

export function TreeHandle(props){
    return (
      <Handle
      isConnectableEnd={false}
      type={props.type}
      position={props.position}
      />
    )
  }

  export function MovementHandle(props){
    return (
      <Handle
      // style={{borderRadius: '50px', backgroundColor: 'blue', bottom: '-4px'}}
      id={props.id}
      type={props.type}
      position={props.position}
      // isConnectable={1}
      />
    )
  }

  export function TriangleHandle(props){
    console.log(props)
    return (
      <Handle
      style={{top: -5}}
      id={props.id}
      isConnectable={false}
      type={props.type}
      position={props.position}
      />
    )
  }